import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject, combineLatest, Subject} from "rxjs";
import {HeroService} from "../calculate-expenses/hero.service";
import {Hero} from "../../models/hero";
import nanoid from "nanoid";
import {AuthService} from "../../shared/auth.service";

export interface Expense {
  id?: number;
  amount: number;
  description: string;
  shareWith: string[];
  heroName: string;
}

@Injectable()
export class ExpensesService {

  private totalExpensesSub = new BehaviorSubject<Expense[]>(null);
  readonly totalExpenses$ = this.totalExpensesSub.asObservable();
  private specificExpensesSub = new BehaviorSubject<Expense[]>(null);
  readonly specificExpenses$ = this.specificExpensesSub.asObservable();
  private ownExpensesSub = new BehaviorSubject<Expense[]>(null);
  readonly ownExpenses$ = this.ownExpensesSub.asObservable();
  private totalSummariesSub = new BehaviorSubject<Summary[]>(null);
  readonly totalSummaries$ = this.totalSummariesSub.asObservable();

  constructor(private db: AngularFirestore,
              private heroService: HeroService,
              private authService: AuthService) {
    combineLatest(this.heroService.heroes$, this.db.collection('/expenses').valueChanges())
      .subscribe(([heroes, totalExpenses]) => {
        this.totalExpensesSub.next(totalExpenses as Expense[]);
        this.specificExpensesSub.next(this.getExpensesForUser(heroes, totalExpenses as Expense[]));
        this.ownExpensesSub.next(this.getOwnExpenses(heroes, totalExpenses as Expense[]));
        this.totalSummariesSub.next(this.getTotalSummaries(heroes, totalExpenses as Expense[]));
      });
  }

  private getOwnExpenses(heroes: Hero[], totalExpenses: Expense[]) {
    const hero = heroes.find(hero => hero.id == this.authService.currentUser.flatmateId);
    return totalExpenses.filter(expense => expense.heroName === hero.name.toLowerCase());
  }

  private getExpensesForUser(heroes: Hero[], totalExpenses: Expense[]) {
    const hero = heroes.find(hero => hero.id == this.authService.currentUser.flatmateId);
    return totalExpenses.filter(expense => expense.shareWith.includes(hero.name));
  }

  addExpense(expense: Expense) {
    let generateId = nanoid();
    this.db.collection("expenses").doc(generateId).set(expense)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }


  private summaryForFlatmate(heroes: Hero[], expenses: Expense[]): Summary[] {

    return heroes.map(fm => {
      const name = fm.name;
      const fmExpenses = expenses
          .filter(e => e.heroName === name.toLowerCase());
      const flatmatesExpectActual = heroes.filter(fm2 => fm2.name !== name);
      const debts: Debt[] = [];

      flatmatesExpectActual.forEach(fm3 => {
        const expensesArray = fmExpenses
          .filter(e => e.shareWith.includes(fm3.name.toLowerCase()))
          .map(e => e.amount/(e.shareWith.length+1));

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
        debts.filter(d => d.debtor == s.creditor).forEach(d => {
          const otherFmDebt = s.debts.find(db => d.creditor == db.name);
          const otherFmDebtAmount = otherFmDebt.amount;
          const amount = otherFmDebtAmount - d.amount;
          otherFmDebt.amount = Math.round(amount * 100) / 100;
        });
        return s;
      });
  }

  private getTotalSummaries(heroes: Hero[], totalExpenses: Expense[]): Summary[] {
    //TODO improve the code
    const summaries = this.summaryForFlatmate(heroes, totalExpenses);
    const debts = this.debtsForFlatmate(summaries);
    const totalSummaries = this.totalSummariesFlatmate(summaries, debts);
    return totalSummaries;
  }
}

export interface Summary {
  creditor: string;
  debts: Debt[];
}

export interface Debt {
  name: string;
  amount: number;
}

export interface TotalDebt {
  creditor: string;
  amount: number;
  debtor: string;
}
