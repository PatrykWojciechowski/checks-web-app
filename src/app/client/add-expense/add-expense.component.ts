import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AddExpenseFacade} from "./add-expense-facade.service";
import {FormGroup} from "@angular/forms";
import {Flatmate} from '../../models/expense.model';
import {ExpensesForm} from './expenses-form';
import {MatStep, MatStepper} from '@angular/material/stepper';
import {StepperSelectionEvent} from '@angular/cdk/stepper';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  providers: [AddExpenseFacade]
})
export class AddExpenseComponent implements OnInit {

  @ViewChild('stepper', {static: true})
  stepper: MatStepper;

  editable: boolean = true;

  firstStepGroup: FormGroup;
  secondStepGroup: FormGroup;
  thirdStepGroup: FormGroup;
  independentDataGroup: FormGroup;
  flatmates$: Observable<Flatmate[]> = this.facade.flatmates$;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private facade: AddExpenseFacade) {
    this.facade.initData();
    this.firstStepGroup = this.facade.form.get('firstStep' as keyof ExpensesForm) as FormGroup;
    this.secondStepGroup = this.facade.form.get('secondStep' as keyof ExpensesForm) as FormGroup;
    this.thirdStepGroup = this.facade.form.get('thirdStep' as keyof ExpensesForm) as FormGroup;
    this.independentDataGroup = this.facade.form.get('independentData' as keyof ExpensesForm) as FormGroup;
  }

  ngOnInit() {
  }

  saveData() {
    this.facade.submitExpense();
    this.editable = false;
  }

  navigateToDashboard() {
    this.router.navigateByUrl('/client-dashboard');
  }

  navigateToExpenses() {
    this.router.navigateByUrl('/client-dashboard/display-expenses');
  }

}
