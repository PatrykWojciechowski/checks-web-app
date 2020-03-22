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
    return summaries.find(summary => summary.creditor === flatmate.name);
  }

  private summaryForFlatmate(flatmates: Flatmate[], totalExpenses: Expense[]): Summary[] {
    return flatmates.map(actualFm => {
      const actualFmId = actualFm.id;
      const actualFmExpenses = this.getActualFmExpenses(totalExpenses, actualFmId);
      const flatmatesExpectActual = this.getFlatmatesExpectActual(flatmates, actualFmId);
      const debtsToActualFm = this.getDebtsToActualFm(flatmatesExpectActual, actualFmExpenses);

      return ({creditor: actualFm.name, debts: debtsToActualFm});
    });
  }

  private getDebtsToActualFm(flatmatesExpectActual: Flatmate[], actualFmExpenses: Expense[]): Debt[] {
    return flatmatesExpectActual.map(flatmate => {
      const fmExpenses = actualFmExpenses
        .filter(expense => this.checkIfFlatmateIsExpenseDebtor(expense, flatmate))
        .map(e => e.amount / (e.debtors.length + 1));

      const totalDebtToThisFm = fmExpenses.length > 0 ? fmExpenses.reduce((a, b) => Number(a) + Number(b)) : 0;

      return {name: flatmate.name, amount: totalDebtToThisFm};
    });
  }

  private getActualFmExpenses(totalExpenses: Expense[], actualFmId): Expense[] {
    return totalExpenses.filter(expense => expense.buyerId === actualFmId.toString());
  }

  private getFlatmatesExpectActual(flatmates: Flatmate[], actualFmId): Flatmate[] {
    return flatmates.filter(flatmate => flatmate.id !== actualFmId);
  }

  private checkIfFlatmateIsExpenseDebtor(expense, flatmate): boolean {
    const debtors = expense.debtors;
    return debtors.map(debtor => debtor.name).includes(flatmate.name)
      && !debtors.find(debtor => debtor.name === flatmate.name).paid;
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

