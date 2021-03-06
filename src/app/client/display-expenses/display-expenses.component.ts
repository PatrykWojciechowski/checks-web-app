import { Component, OnInit } from '@angular/core';
import {ExpensesFacade} from "./expenses-facade.service";
import {Router} from '@angular/router';

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

  readonly columnsTotalExpenses: string[] = ['description', 'buyer', 'debtors', 'amount', 'dividedAmount'];
  readonly columnsSpecificExpenses: string[] = ['description', 'buyer', 'amount', 'dividedAmount'];
  readonly columnsDebts: string[] = ['description', 'buyer', 'amount', 'dividedAmount', 'button'];

  constructor(private facade: ExpensesFacade) {}

  ngOnInit() {}

  checkDebtPayed(expenseId: string): void {
    // TODO enable when "even out bills is properly implemented"
    // this.facade.payDebt(expenseId);
  }

}
