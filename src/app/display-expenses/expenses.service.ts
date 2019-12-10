import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {combineLatest, Subject} from "rxjs";
import {HeroService} from "../calculate-expenses/hero.service";
import {Hero} from "../hero";
import nanoid from "nanoid";

export interface Expense {
  id?: number;
  amount: number;
  description: string;
  shareWith: string[];
  heroName: string;
}

@Injectable()
export class ExpensesService {

  private totalExpensesSub = new Subject<Expense[]>();
  readonly totalExpenses$ = this.totalExpensesSub.asObservable();
  private specificExpensesSub = new Subject<Expense[]>();
  readonly specificExpenses$ = this.totalExpensesSub.asObservable();

  constructor(private db: AngularFirestore, private heroService: HeroService) {}

  initData(heroId: number) {
    combineLatest(this.heroService.heroes$, this.db.collection('/expenses').valueChanges())
      .subscribe(([heroes, totalExpenses]) => {
      this.totalExpensesSub.next(totalExpenses as Expense[]);
      this.specificExpensesSub.next(this.getExpensesForUser(heroId, heroes, totalExpenses as Expense[]))
    });
  }

  private getExpensesForUser(heroId: number, heroes: Hero[], totalExpenses: Expense[]) {
    const hero = heroes.find(hero => hero.id == heroId);
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
}