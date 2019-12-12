import { Component, OnInit } from '@angular/core';
import {ExpensesService} from "./expenses.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-display-expenses',
  templateUrl: './display-expenses.component.html',
  styleUrls: ['./display-expenses.component.scss']
})
export class DisplayExpensesComponent implements OnInit {

  readonly expenses$ = this.service.totalExpenses$;
  readonly specificExpenses$ = this.service.specificExpenses$;
  columnsTotalExpenses: string[] = ['description', 'buyer', 'shareWith', 'amount', 'giveBack'];
  columnsSpecificExpenses: string[] = ['description', 'buyer', 'amount', 'giveBack']
  heroId: number;

  constructor(private service: ExpensesService,
              private route: ActivatedRoute) {
    this.heroId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.service.initData(this.heroId);
  }



}