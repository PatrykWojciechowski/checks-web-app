import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {Hero, HEROES} from "../hero";

@Component({
  selector: 'app-calculate-expenses',
  templateUrl: './calculate-expenses.component.html',
  styleUrls: ['./calculate-expenses.component.scss']
})
export class CalculateExpensesComponent implements OnInit {

  heroes;
  calculator = new ExpensesCalculator();
  heroId: number;
  shareWithOptions = ["All flatmates"];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeData();
  }

  private initializeData() {
    this.heroId = this.route.snapshot.params['id'];
    HEROES.forEach(hero => {
      if (hero.id !== this.heroId) {
        this.shareWithOptions.push(hero.name);
      }
    });
  }
}
