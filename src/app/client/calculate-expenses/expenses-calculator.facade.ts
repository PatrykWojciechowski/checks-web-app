import {Injectable} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {Hero} from "../../models/hero";
import {HeroService} from "./hero.service";
import {map, tap} from "rxjs/operators";
import {FormUtils} from "../../utils/form.utils";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Expense, ExpensesService} from "../display-expenses/expenses.service";
import {AuthService} from "../../shared/auth.service";

@Injectable()
export class ExpensesCalculatorFacade {

  private heroesSubject = new BehaviorSubject<Hero[]>(null);
  heroes$: Observable<Hero[]> = this.heroesSubject.asObservable();

  readonly form: FormGroup;
  private username: any;

  constructor(private heroService: HeroService,
              private expensesService: ExpensesService,
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
    console.log(this.authService.currentUser);
    this.heroService.heroes$.pipe(
      tap(heroes => {
        const chosenHero = heroes.find(hero => {
          return hero.id == +this.username
        });
        this.form.get('whoBought' as keyof ExpensesForm).patchValue(chosenHero.name.toLowerCase());
      }),
      map(heroes => heroes.filter(hero => hero.id != +this.username))
    ).subscribe(val => {
      this.heroesSubject.next(val)}
    );
  }

  saveData() {
    const expense: Expense = this.mapFormToExpense(this.form.value);
    this.expensesService.addExpense(expense);
  }

  private mapFormToExpense(form: ExpensesForm): Expense {
    return {
      amount: form.moneySpent,
      shareWith: this.getHeroNames(form.shareWith),
      description: form.description,
      heroName: form.whoBought,
    };
  }

  private getHeroNames(shareWith: Hero[]): string[] {
    return shareWith.map(hero => hero.name);
  }
}

export interface ExpensesForm {
  shareWith: Hero[];
  moneySpent: number;
  description: string;
  profImage: File;
  whoBought: string;
  amountToGiveBack: string;
}
