import {Injectable} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {FlatmateService} from "../../shared/flatmate.service";
import {map, tap} from "rxjs/operators";
import {FormUtils} from "../../utils/form.utils";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Debtor, Expense, Flatmate} from '../../models/expense.model';
import {ExpenseService} from '../../shared/expense.service';

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
      flatmates: new FormControl([]),
      amount: new FormControl(),
      description: new FormControl(),
      img: new FormControl(),
      buyer: new FormControl(),
      dividedAmount: new FormControl()
    };
    const form = this.fb.group(config);
    combineLatest(form.get('flatmates').valueChanges, form.get('amount').valueChanges)
      .subscribe(([flatmates, amount]) => {
        this.form.get('dividedAmount').patchValue((amount / (flatmates.length + 1)).toFixed(2));
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
      return fm.id == this.authService.currentUser.flatmateId;
    });
    this.form.get('buyer' as keyof ExpensesForm).patchValue(chosenFm);
    this.chosenFlatmateId = chosenFm.id;
  }

  submitExpense(): void {
    const expense: Expense = this.mapFormToExpense(this.form.value);
    this.expenseService.addExpense(expense);
  }

  private mapFormToExpense(form: ExpensesForm): Expense {
    return {
      buyerId: form.buyer.id.toString(),
      amount: form.amount,
      description: form.description,
      debtors: this.getDebtors(form.flatmates, form.dividedAmount),
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

export interface ExpensesForm {
  flatmates: Flatmate[];
  amount: number;
  description: string;
  img: File;
  buyer: Flatmate;
  dividedAmount: number;
}
