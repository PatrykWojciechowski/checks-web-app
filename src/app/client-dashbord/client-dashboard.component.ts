import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExpensesCalculatorFacade} from "../calculate-expenses/expenses-calculator.facade";

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {

  heroId: number;

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.heroId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
  }

  navigateToCalculate() {
    this.router.navigateByUrl('/calculate-expenses/' + this.heroId);
  }

  navigateToDisplay() {
    this.router.navigateByUrl('/display-expenses/' + this.heroId);
  }
}
