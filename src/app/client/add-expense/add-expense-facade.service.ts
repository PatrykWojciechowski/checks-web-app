import {Injectable} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {FlatmateService} from "../../shared/flatmate.service";
import {map, tap} from "rxjs/operators";
import {FormUtils} from "../../utils/form.utils";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Debtor, Expense, Flatmate} from '../../models/expense.model';
import {ExpenseService} from '../../shared/expense.service';
import {ExpensesForm} from './expenses-form';

@Injectable()
export class AddExpenseFacade {

  private flatmatesSub = new BehaviorSubject<Flatmate[]>(null);
  flatmates$: Observable<Flatmate[]> = this.flatmatesSub.asObservable();
  private chosenFlatmateId: any;

  readonly form: FormGroup;

  constructor(private heroService: FlatmateService,
              private expenseService: ExpenseService,
              private fb: FormBuilder,
              private authService: AuthService) {
    this.form = this.buildExpensesForm();
  }

  buildExpensesForm(): FormGroup {

    const config: FormUtils.Config<ExpensesForm> = {
      firstStep: this.fb.group({
        flatmates: new FormControl([], Validators.required),
      }),
      secondStep: this.fb.group({
        amount: new FormControl(null, Validators.required),
      }),
      thirdStep: this.fb.group({
        description: new FormControl(null, Validators.required),
      }),
      independentData: this.fb.group({
        img: new FormControl(),
        buyer: new FormControl(),
        dividedAmount: new FormControl()
      })
    };

    const form = this.fb.group(config);

    const flatmatesControl = form.get(
      [
        'firstStep' as keyof ExpensesForm,
        'flatmates' as keyof ExpensesForm.FirstStep
      ]);
    const amountControl = form.get(
      [
        'secondStep' as keyof ExpensesForm,
        'amount' as keyof ExpensesForm.SecondStep
      ]);
    const dividedAmountControl = form.get(
      [
        'independentData' as keyof ExpensesForm,
        'dividedAmount' as keyof ExpensesForm.IndependentData
      ]
    );

    combineLatest(flatmatesControl.valueChanges, amountControl.valueChanges)
      .subscribe(([flatmates, amount]) => {
        dividedAmountControl.patchValue((amount / (flatmates.length + 1)).toFixed(2), {emitEvent: false});
      });
    return form;
  }

  initData(): void {
    this.heroService.flatmates$.pipe(
      tap(flatmates => this.setBuyerInsideForm(flatmates)),
      map(flatmates => this.excludeBuyerFromFm(flatmates))
    ).subscribe(this.flatmatesSub);
  }

  private excludeBuyerFromFm(flatmates): Flatmate[] {
    return flatmates.filter(fm => fm.id != this.chosenFlatmateId);
  }

  private setBuyerInsideForm(flatmates): void {
    const chosenFm: Flatmate = flatmates.find(fm => {
      return fm.id === this.authService.currentUser.flatmateId;
    });
    const buyerControl = this.form.get([
      'independentData' as keyof ExpensesForm,
      'buyer' as keyof ExpensesForm.IndependentData
    ]);
    buyerControl.patchValue(chosenFm, { emitEvent: false });
    this.chosenFlatmateId = chosenFm.id;
  }

  submitExpense(): void {
    const expense: Expense = this.mapFormToExpense(this.form.value);
    this.expenseService.addExpense(expense);
  }

  private mapFormToExpense(form: ExpensesForm): Expense {
    return {
      id: this.expenseService.generateId(),
      buyerId: form.independentData.buyer.id.toString(),
      amount: form.secondStep.amount,
      description: form.thirdStep.description,
      debtors: this.getDebtors(form.firstStep.flatmates, form.independentData.dividedAmount),
      timestamp: new Date()
    };
  }

  private getDebtors(flatmates: Flatmate[], amount: number): Debtor[] {
    return flatmates.map(flatmate => ({
      name: flatmate.name,
      amount: amount,
      paid: false
    }));
  }
}



