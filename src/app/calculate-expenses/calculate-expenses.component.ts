import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Hero} from "../hero";
import {HeroService} from "./hero.service";
import {Observable} from "rxjs";
import {ExpensesCalculatorFacade} from "./expenses-calculator.facade";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-calculate-expenses',
  templateUrl: './calculate-expenses.component.html',
  styleUrls: ['./calculate-expenses.component.scss'],
  providers: [ExpensesCalculatorFacade]
})
export class CalculateExpensesComponent implements OnInit {

  expensesForm: FormGroup;
  heroes$: Observable<Hero[]> = this.facade.heroes$;
  heroId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private facade: ExpensesCalculatorFacade) {
   this.heroId = this.route.snapshot.params['id'];
   this.facade.initData(this.heroId);
   this.expensesForm = this.facade.form;
  }

  ngOnInit() {}

  saveData() {
    this.facade.saveData();
  }

  navigateToDashboard() {
    this.router.navigateByUrl('/client-dashboard/' + this.heroId);
  }
}
