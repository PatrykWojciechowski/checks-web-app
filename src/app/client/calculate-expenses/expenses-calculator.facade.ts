import {Injectable} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {FlatmateService} from "../../shared/flatmate.service";
import {map, tap} from "rxjs/operators";
import {FormUtils} from "../../utils/form.utils";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ExpensesFacade} from "../display-expenses/expenses-facade.service";
import {AuthService} from "../../shared/auth.service";
import {Expense, Flatmate} from '../../models/expense.model';
import {ExpenseService} from '../../shared/expense.service';

@Injectable()
export class ExpensesCalculatorFacade {

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

  buildExpensesForm() {
    const config: FormUtils.Config<ExpensesForm> = {
      shareWith: new FormControl([]),
      moneySpent: new FormControl(),
      description: new FormControl(),
      profImage: new FormControl(),
      whoBought: new FormControl(),
      amountToGiveBack: new FormControl()
    };
    const form = this.fb.group(config);
    combineLatest(form.get('shareWith').valueChanges, form.get('moneySpent').valueChanges)
      .subscribe(([shareWith, money]) => {
        this.form.get('amountToGiveBack').patchValue((money / (shareWith.length +1)).toFixed(2));
      });
    return form;
  }

  initData(): void {
    this.heroService.flatmates$.pipe(
      tap(heroes => {
        const chosenHero = heroes.find(hero => {
          return hero.id == this.authService.currentUser.flatmateId;
        });
        this.form.get('whoBought' as keyof ExpensesForm).patchValue(chosenHero.name.toLowerCase());
        this.chosenFlatmateId = chosenHero.id;
      }),
      map(heroes => heroes.filter(hero => hero.id != this.chosenFlatmateId))
    ).subscribe(val => {
      this.flatmatesSub.next(val)}
    );
  }

  saveData() {
    const expense: Expense = this.mapFormToExpense(this.form.value);
    this.expenseService.addExpense(expense);
  }

  private mapFormToExpense(form: ExpensesForm): Expense {
    return {
      amount: form.moneySpent,
      shareWith: this.getFmNames(form.shareWith),
      description: form.description,
      heroName: form.whoBought,
    };
  }

  private getFmNames(shareWith: Flatmate[]): string[] {
    return shareWith.map(hero => hero.name);
  }
}

export interface ExpensesForm {
  shareWith: Flatmate[];
  moneySpent: number;
  description: string;
  profImage: File;
  whoBought: string;
  amountToGiveBack: string;
}
