import {Injectable} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {Hero} from "../hero";
import {HeroService} from "./hero.service";
import {map} from "rxjs/operators";
import {FormUtils} from "../utils/form.utils";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Injectable()
export class ExpensesCalculatorFacade {

  private heroSubject = new BehaviorSubject<Hero[]>(null);
  heroes$: Observable<Hero[]> = this.heroSubject.asObservable();
  readonly form: FormGroup;

  constructor(private heroService: HeroService, private fb: FormBuilder) {
    this.form = this.buildExpensesForm();
  }

  buildExpensesForm() {
    const config: FormUtils.Config<ExpensesForm> = {
      shareWith: new FormControl([]),
      moneySpent: new FormControl(),
      profImage: new FormControl(),
      amountToGiveBack: new FormControl()
    };
    const form = this.fb.group(config);
    combineLatest(form.get('shareWith').valueChanges, form.get('moneySpent').valueChanges)
      .subscribe(([shareWith, money]) => {
        this.form.get('amountToGiveBack').patchValue((money / (shareWith.length +1)).toFixed(2));
      });
    return form;
  }

  initData(heroId: number) {
    this.heroService.heroes$.pipe(
      map(heroes => heroes.filter(hero => hero.id != heroId))
    ).subscribe(val => {
      this.heroSubject.next(val)}
    );
  }
}

export interface ExpensesForm {
  shareWith: Hero[];
  moneySpent: number;
  profImage: File;
  amountToGiveBack: string;
}
