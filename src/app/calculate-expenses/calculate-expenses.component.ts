import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HEROES} from "../hero";
import {ExpensesCalculator} from "./expense-calculator";

@Component({
  selector: 'app-calculate-expenses',
  templateUrl: './calculate-expenses.component.html',
  styleUrls: ['./calculate-expenses.component.scss']
})
export class CalculateExpensesComponent implements OnInit {

  calculator = new ExpensesCalculator();
  heroId: number;
  shareWithOptions = [];
  allFlatmates = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.initializeData();
  }

  private initializeData() {
    this.heroId = this.route.snapshot.params['id'];
    HEROES.forEach(hero => {
      if (hero.id != this.heroId) {
        this.shareWithOptions.push(hero);
      }
    });
    this.allFlatmates = this.shareWithOptions;
  }

  dupa() {
    console.log(this.calculator.shareWith);
  }
}
