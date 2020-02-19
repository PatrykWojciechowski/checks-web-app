import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExpensesFacade} from '../expenses-facade.service';
import {Expense} from '../../../models/expense.model';
import {FlatmateService} from '../../../shared/flatmate.service';

@Component({
  selector: 'app-debt-payed',
  templateUrl: './debt-payed.component.html',
  styleUrls: ['./debt-payed.component.css']
})
export class DebtPayedComponent implements OnInit {

  @Input()
  expense: Expense;

  @Output()
  payExpense: EventEmitter<string> = new EventEmitter<string>();

  constructor(private expenseFacade: ExpensesFacade, private flatmateService: FlatmateService) {}

  ngOnInit(): void {}

  payDebt() {
    this.payExpense.emit(this.expense.id);
  }

  get expensePaid() {
    return this.expense.debtors.find(debtor =>
      debtor.name === this.flatmateService.currentFlatmate.name).paid;
  }
}
