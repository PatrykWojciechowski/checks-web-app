import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ExpensesCalculatorFacade} from "./expenses-calculator.facade";
import {FormGroup} from "@angular/forms";
import {Flatmate} from '../../models/expense.model';

@Component({
  selector: 'app-calculate-expenses',
  templateUrl: './calculate-expenses.component.html',
  styleUrls: ['./calculate-expenses.component.scss'],
  providers: [ExpensesCalculatorFacade]
})
export class CalculateExpensesComponent implements OnInit {

  expensesForm: FormGroup;
  flatmates$: Observable<Flatmate[]> = this.facade.flatmates$;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private facade: ExpensesCalculatorFacade) {
   this.facade.initData();
   this.expensesForm = this.facade.form;
  }

  ngOnInit() {}

  saveData() {
    this.facade.saveData();
  }

  navigateToDashboard() {
    this.router.navigateByUrl('/client-dashboard');
  }

  navigateToExpenses() {
    this.router.navigateByUrl('/client-dashboard/display-expenses');
  }
}
