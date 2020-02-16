import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

import nanoid from "nanoid";
import {Expense} from '../models/expense.model';

@Injectable()
export class ExpenseService {

  private expensesSub = new Subject<Expense[]>();
  readonly expenses$ = this.expensesSub.asObservable();

  constructor(private db: AngularFirestore) {
    this.db.collection('/expenses').valueChanges().subscribe(this.expensesSub);
  }

  addExpense(expense: Expense) {
    this.db.collection("expenses").add(expense)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }
}
