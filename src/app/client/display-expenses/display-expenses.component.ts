import { Component, OnInit } from '@angular/core';
import {ExpensesService} from "./expenses.service";

@Component({
  selector: 'app-display-expenses',
  templateUrl: './display-expenses.component.html',
  styleUrls: ['./display-expenses.component.scss'],
})
export class DisplayExpensesComponent implements OnInit {

  readonly expenses$ = this.service.totalExpenses$;
  readonly specificExpenses$ = this.service.specificExpenses$;
  readonly ownExpenses$ = this.service.ownExpenses$;
  readonly summaries$ = this.service.totalSummaries$;
  readonly summary$ = this.service.userSummary$;
  columnsTotalExpenses: string[] = ['description', 'buyer', 'shareWith', 'amount', 'giveBack'];
  columnsSpecificExpenses: string[] = ['description', 'buyer', 'amount', 'giveBack'];
  columnsDebts: string[] = ['description', 'buyer', 'amount', 'giveBack', 'button'];
  heroId: number;

  constructor(private service: ExpensesService) {}

  ngOnInit() {}



}
