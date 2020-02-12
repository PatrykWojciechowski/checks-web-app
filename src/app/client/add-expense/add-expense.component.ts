import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AddExpenseFacade} from "./add-expense-facade.service";
import {FormGroup} from "@angular/forms";
import {Flatmate} from '../../models/expense.model';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  providers: [AddExpenseFacade]
})
export class AddExpenseComponent implements OnInit {

  expensesForm: FormGroup;
  flatmates$: Observable<Flatmate[]> = this.facade.flatmates$;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private facade: AddExpenseFacade) {
   this.facade.initData();
   this.expensesForm = this.facade.form;
  }

  ngOnInit() {}

  saveData() {
    this.facade.submitExpense();
  }

  navigateToDashboard() {
    this.router.navigateByUrl('/client-dashboard');
  }

  navigateToExpenses() {
    this.router.navigateByUrl('/client-dashboard/display-expenses');
  }
}
