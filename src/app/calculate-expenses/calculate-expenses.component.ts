import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Hero, HEROES} from "../hero";
import {ExpensesCalculator} from "./expense-calculator";
import {HeroService} from "./hero.service";
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable} from "rxjs";
import {ExpensesCalculatorFacade} from "./expenses-calculator.facade";

@Component({
  selector: 'app-calculate-expenses',
  templateUrl: './calculate-expenses.component.html',
  styleUrls: ['./calculate-expenses.component.scss'],
  providers: [ExpensesCalculatorFacade]
})
export class CalculateExpensesComponent implements OnInit {

  calculator = new ExpensesCalculator();
  allFlatmates = [];
  heroes$: Observable<Hero[]> = this.facade.heroes$;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private facade: ExpensesCalculatorFacade) {
   const id = this.route.snapshot.params['id'];
   this.facade.initData(id);
  }

  ngOnInit() {}
}
