import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject, combineLatest} from "rxjs";
import {FlatmateService} from "../../shared/flatmate.service";

import {AuthService} from "../../shared/auth.service";
import {ExpenseService} from '../../shared/expense.service';
import {Debt, Expense, Flatmate, Summary, TotalDebt} from '../../models/expense.model';
import {distinctUntilChanged, map} from 'rxjs/operators';

export interface ExpenseState {
  totalExpenses: Expense[];
  debts: Expense[];
  ownExpenses: Expense[];
  totalSummaries: Summary[];
  userSummary: Summary;
}

let _state: ExpenseState = {
  totalExpenses: null,
  debts: null,
  ownExpenses: null,
  totalSummaries: null,
  userSummary: null
};

@Injectable()
export class ExpensesFacade {

  private store  = new BehaviorSubject<ExpenseState>(_state);
  private state$ = this.store.asObservable();

  readonly totalExpenses$ = this.state$.pipe(map(state => state.totalExpenses), distinctUntilChanged());
  readonly debts$ = this.state$.pipe(map(state => state.debts), distinctUntilChanged());
  readonly ownExpenses$ = this.state$.pipe(map(state => state.ownExpenses), distinctUntilChanged());
  readonly totalSummaries$ = this.state$.pipe(map(state => state.totalSummaries), distinctUntilChanged());
  readonly userSummary$ = this.state$.pipe(map(state => state.userSummary), distinctUntilChanged());

  constructor(
    private db: AngularFirestore,
    private flatmateService: FlatmateService,
    private authService: AuthService,
    private expenseService: ExpenseService,
  ) {
    combineLatest(this.flatmateService.flatmates$, this.flatmateService.currentFlatmate$, this.expenseService.expenses$)
      .subscribe(([flatmates, currentFlatmate, totalExpenses]) => {
        this.prepareDataAndUpdateStore(totalExpenses, currentFlatmate, flatmates);
      });
  }

  private prepareDataAndUpdateStore(totalExpenses, currentFlatmate, flatmates) {
    const debts = this.getOwnDebts(currentFlatmate, totalExpenses as Expense[]);
    const ownExpenses = this.getOwnExpenses(currentFlatmate, totalExpenses as Expense[]);
    const totalSummaries = this.getTotalSummaries(flatmates, totalExpenses as Expense[]);
    const userSummary = this.getUserSummary(currentFlatmate, totalSummaries);

    return this.updateState({..._state, totalExpenses, debts, ownExpenses, totalSummaries, userSummary})
  }

  private updateState(state: ExpenseState) {
    this.store.next(_state = state);
  }

  private getOwnExpenses(currentFlatmate, totalExpenses: Expense[]): Expense[] {
    return totalExpenses.filter(expense => expense.buyerId === currentFlatmate.id);
  }

  private getOwnDebts(currentFlatmate, totalExpenses: Expense[]): Expense[] {
   return totalExpenses.filter(expense => expense.debtors.some(debtor => debtor.name === currentFlatmate.name));
  }

  private getTotalSummaries(flatmates: Flatmate[], totalExpenses: Expense[]): Summary[] {
    const summaries = this.summaryForFlatmate(flatmates, totalExpenses);
    const debts = this.debtsForFlatmate(summaries);
    const totalSummaries = this.totalSummariesFlatmate(summaries, debts);
    return totalSummaries;
  }

  private getUserSummary(flatmate, summaries: Summary[]): Summary {
    return summaries.find(s => s.creditor === flatmate.name);
  }

  private summaryForFlatmate(flatmates: Flatmate[], expenses: Expense[]): Summary[] {
    return flatmates.map(fm => {
      const fmId = fm.id;
      const fmExpenses = expenses.filter(e => e.buyerId === fmId.toString());
      const flatmatesExpectActual = flatmates.filter(fm2 => fm2.id !== fmId);
      const debts: Debt[] = [];

      flatmatesExpectActual.forEach(fm3 => {
        const expensesArray = fmExpenses
          .filter(expense => {
            const debtors = expense.debtors;
            return debtors.map(debtor => debtor.name).includes(fm3.name)
              && !debtors.find(debtor => debtor.name === fm3.name).paid
          })
          .map(e => e.amount/(e.debtors.length+1));

        const totalDebtToThisFm = expensesArray.length > 0 ?
          expensesArray.reduce((a,b) => Number(a) + Number(b)) : 0;

        debts.push({name: fm3.name, amount: totalDebtToThisFm})
      });

      return ({creditor: fm.name, debts: debts})
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
      debts.filter(d => d.debtor == s.creditor).forEach(d => {
        const otherFmDebt = s.debts.find(db => d.creditor == db.name);
        const otherFmDebtAmount = otherFmDebt.amount;
        const amount = otherFmDebtAmount - d.amount;
        otherFmDebt.amount = Math.round(amount * 100) / 100;
      });
      return s;
    });
  }


  payDebt(expenseId: string) {
    this.expenseService.payDebt(expenseId);
  }
}

