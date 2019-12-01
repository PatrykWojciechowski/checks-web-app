import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Hero} from "../hero";
import {HeroService} from "./hero.service";
import {map} from "rxjs/operators";

@Injectable()
export class ExpensesCalculatorFacade {

  private heroSubject = new Subject<Hero[]>();
  heroes$: Observable<Hero[]> = this.heroSubject.asObservable();

  constructor(private heroService: HeroService) {}

  initData(heroId: number){
    this.heroService.heroes$.pipe(
      map(heroes => heroes.filter(hero => hero.id != heroId))
    ).subscribe(this.heroSubject);
  }

}
