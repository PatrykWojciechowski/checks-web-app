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

  constructor(private db: AngularFirestore,
              private heroService: HeroService,
              private authService: AuthService) {
    combineLatest(this.heroService.heroes$, this.db.collection('/expenses').valueChanges())
      .subscribe(([heroes, totalExpenses]) => {
        this.totalExpensesSub.next(totalExpenses as Expense[]);
        this.specificExpensesSub.next(this.getExpensesForUser(heroes, totalExpenses as Expense[]));
        this.ownExpensesSub.next(this.getOwnExpenses(heroes, totalExpenses as Expense[]));
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

}
