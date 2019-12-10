import {Injectable} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {Hero} from "../hero";
import {HeroService} from "./hero.service";
import {map, tap} from "rxjs/operators";
import {FormUtils} from "../utils/form.utils";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Expense, ExpensesService} from "../display-expenses/expenses.service";

@Injectable()
export class ExpensesCalculatorFacade {

  private heroesSubject = new BehaviorSubject<Hero[]>(null);
  heroes$: Observable<Hero[]> = this.heroesSubject.asObservable();
  // private heroSubject = new BehaviorSubject<Hero>(null);
  // chosenHero$: Observable<Hero> = this.heroSubject.asObservable();
  readonly form: FormGroup;

  constructor(private heroService: HeroService, private expensesService: ExpensesService, private fb: FormBuilder) {
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

  initData(heroId: number): void {
    this.heroService.heroes$.pipe(
      tap(heroes => {
        const chosenHero = heroes.find(hero => hero.id == heroId);
        this.form.get('whoBought' as keyof ExpensesForm).patchValue(chosenHero.name.toLowerCase());
      }),
      map(heroes => heroes.filter(hero => hero.id != heroId))
    ).subscribe(val => {
      this.heroesSubject.next(val)}
    );
  }

  saveData() {
    const expense: Expense = this.mapFormToExpense(this.form.value);
    console.log(expense)
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
