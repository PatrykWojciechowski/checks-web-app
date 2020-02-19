import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Expense, Flatmate} from '../models/expense.model';
import {filter, switchMap} from 'rxjs/operators';
import {FlatmateService} from './flatmate.service';

@Injectable()
export class ExpenseService {

  private _expenses: Expense[];
  private expensesSub = new BehaviorSubject<Expense[]>(null);
  readonly expenses$ = this.expensesSub.pipe(
    filter(expenses => !!expenses)
  );

  constructor(private db: AngularFirestore, private flatmateService: FlatmateService) {
    this.db.collection('/expenses').valueChanges().subscribe((expenses: Expense[]) => {
      this.expensesSub.next(expenses);
      this._expenses = expenses;
    });
  }

  addExpense(expense: Expense) {
    this.db.doc(`/expenses/${expense.id}`).set(expense)
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  payDebt(expenseId: string) {
    this.flatmateService.currentFlatmate$.pipe(
      switchMap(flatmate => {
        const fmNameWhoPaid = flatmate.name;
        const expenseToBePaid = this._expenses.find(exp => exp.id === expenseId);
        const debtors = expenseToBePaid.debtors.map(debtor => {
          if (debtor.name === fmNameWhoPaid){
            debtor.paid = !debtor.paid;
          };
          return debtor;
        });
        expenseToBePaid.debtors = debtors;
        const expenseRef = this.db.doc(`/expenses/${expenseId}`);
        return expenseRef.set(expenseToBePaid, {merge: true});
      })
    ).subscribe();
  }

  generateId() {
    return this.db.createId();
  }
}
