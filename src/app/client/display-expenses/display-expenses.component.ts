import { Component, OnInit } from '@angular/core';
import {ExpensesService} from "./expenses.service";

@Component({
  selector: 'app-display-expenses',
  templateUrl: './display-expenses.component.html',
  styleUrls: ['./display-expenses.component.scss'],
})
export class DisplayExpensesComponent implements OnInit {

  readonly expenses$ = this.service.totalExpenses$;
  readonly debts$ = this.service.debts$;
  readonly ownExpenses$ = this.service.ownExpenses$;
  readonly summaries$ = this.service.totalSummaries$;
  readonly summary$ = this.service.userSummary$;

  readonly columnsTotalExpenses: string[] = ['description', 'buyer', 'shareWith', 'amount', 'giveBack'];
  readonly columnsSpecificExpenses: string[] = ['description', 'buyer', 'amount', 'giveBack'];
  readonly columnsDebts: string[] = ['description', 'buyer', 'amount', 'giveBack', 'button'];

  constructor(private service: ExpensesService) {}

  ngOnInit() {}



}
