import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject, combineLatest} from "rxjs";
import {FlatmateService} from "../../shared/flatmate.service";

import {AuthService} from "../../shared/auth.service";
import {ExpenseService} from '../../shared/expense.service';
import {Debt, Expense, Flatmate, Summary, TotalDebt} from '../../models/expense.model';

@Injectable()
export class ExpensesFacade {

  private totalExpensesSub = new BehaviorSubject<Expense[]>(null);
  readonly totalExpenses$ = this.totalExpensesSub.asObservable();
  private debtsSub = new BehaviorSubject<Expense[]>(null);
  readonly debts$ = this.debtsSub.asObservable();
  private ownExpensesSub = new BehaviorSubject<Expense[]>(null);
  readonly ownExpenses$ = this.ownExpensesSub.asObservable();
  private totalSummariesSub = new BehaviorSubject<Summary[]>(null);
  readonly totalSummaries$ = this.totalSummariesSub.asObservable();
  private userSummarySub = new BehaviorSubject<Summary>(null);
  readonly userSummary$ = this.userSummarySub.asObservable();

  constructor(
    private db: AngularFirestore,
    private flatmateService: FlatmateService,
    private authService: AuthService,
    private expenseService: ExpenseService,
  ) {
    combineLatest(this.flatmateService.flatmates$, this.flatmateService.currentFlatmate$, this.expenseService.expenses$)
      .subscribe(([flatmates, currentFlatmate, totalExpenses]) => {
        this.prepareData(totalExpenses, currentFlatmate, flatmates);
      });
  }

  private prepareData(totalExpenses, currentFlatmate, flatmates) {
    this.totalExpensesSub.next(totalExpenses as Expense[]);
    this.debtsSub.next(this.getOwnDebts(currentFlatmate, totalExpenses as Expense[]));
    this.ownExpensesSub.next(this.getOwnExpenses(currentFlatmate, totalExpenses as Expense[]));
    const summaries = this.getTotalSummaries(flatmates, totalExpenses as Expense[]);
    this.totalSummariesSub.next(summaries);
    this.userSummarySub.next(this.getUserSummary(currentFlatmate, summaries))
  }

  private getOwnExpenses(currentFlatmate, totalExpenses: Expense[]): Expense[] {
    return totalExpenses.filter(expense => expense.buyerId === currentFlatmate.id);
  }

  private getOwnDebts(currentFlatmate, totalExpenses: Expense[]): Expense[] {
   return totalExpenses.filter(expense => expense.debtors.some(debtor => debtor.name === currentFlatmate.name));
  }

  private summaryForFlatmate(flatmates: Flatmate[], expenses: Expense[]): Summary[] {
    return flatmates.map(fm => {
      const fmId = fm.id;
      const fmExpenses = expenses.filter(e => e.buyerId === fmId);
      const flatmatesExpectActual = flatmates.filter(fm2 => fm2.id !== fmId);
      const debts: Debt[] = [];

      //TODO resolve lower/upper case problem
      flatmatesExpectActual.forEach(fm3 => {
        const expensesArray = fmExpenses
          .filter(e => e.debtors.map(e => e.name.toLowerCase()).includes(fm3.name.toLowerCase()))
          .map(e => e.amount/(e.debtors.length+1));
        console.log('expensesarr', expensesArray);
        console.log('to this fm', fm);

        const totalDebtToThisFm = expensesArray.length > 0 ?
          expensesArray.reduce((a,b) => Number(a) + Number(b)) : 0;

        debts.push({name: fm3.name, amount: totalDebtToThisFm})
      });

      return ({creditor: name, debts: debts})
    });
  }

  private debtsForFlatmate(summaries: Summary[]): TotalDebt[] {
    const totalDebts: TotalDebt[] = [];
    summaries.forEach(s => {
      s.debts.forEach(d => {
        totalDebts.push({creditor: s.creditor, amount: d.amount, debtor: d.name});
      });
    });
    return totalDebts;
  }

  private totalSummariesFlatmate(summaries: Summary[], debts: TotalDebt[]): Summary[] {
      return summaries.map(s => {
        //TODO something is wrong here
        debts.filter(d => d.debtor == s.creditor).forEach(d => {
          const otherFmDebt = s.debts.find(db => d.creditor == db.name);
          const otherFmDebtAmount = otherFmDebt.amount;
          const amount = otherFmDebtAmount - d.amount;
          otherFmDebt.amount = Math.round(amount * 100) / 100;
        });
        return s;
      });
  }

  private getTotalSummaries(flatmates: Flatmate[], totalExpenses: Expense[]): Summary[] {
    //TODO improve the code
    const summaries = this.summaryForFlatmate(flatmates, totalExpenses);
    const debts = this.debtsForFlatmate(summaries);
    console.log(debts);
    const totalSummaries = this.totalSummariesFlatmate(summaries, debts);
    console.log(totalSummaries)
    return totalSummaries;
  }

  private getUserSummary(flatmate, summaries: Summary[]): Summary {
    return summaries.find(s => s.creditor === flatmate.name);
  }
}

