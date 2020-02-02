import { Component, OnInit } from '@angular/core';
import {ExpensesFacade} from "./expenses-facade.service";

@Component({
  selector: 'app-display-expenses',
  templateUrl: './display-expenses.component.html',
  styleUrls: ['./display-expenses.component.scss'],
})
export class DisplayExpensesComponent implements OnInit {

  readonly expenses$ = this.facade.totalExpenses$;
  readonly debts$ = this.facade.debts$;
  readonly ownExpenses$ = this.facade.ownExpenses$;
  readonly summaries$ = this.facade.totalSummaries$;
  readonly summary$ = this.facade.userSummary$;

  readonly columnsTotalExpenses: string[] = ['description', 'buyer', 'shareWith', 'amount', 'giveBack'];
  readonly columnsSpecificExpenses: string[] = ['description', 'buyer', 'amount', 'giveBack'];
  readonly columnsDebts: string[] = ['description', 'buyer', 'amount', 'giveBack', 'button'];

  constructor(private facade: ExpensesFacade) {}

  ngOnInit() {}



}
