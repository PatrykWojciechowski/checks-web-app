import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExpensesFacade} from '../expenses-facade.service';
import {Expense} from '../../../models/expense.model';
import {FlatmateService} from '../../../shared/flatmate.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-debt-paid',
  templateUrl: './debt-paid.component.html',
  styleUrls: ['./debt-paid.component.css']
})
export class DebtPaidComponent implements OnInit {

  debtPaid: FormControl = new FormControl({value: false, disable: true});

  @Input()
  expense: Expense;

  @Output()
  payExpense: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private expenseFacade: ExpensesFacade,
    private flatmateService: FlatmateService) {}

  ngOnInit(): void {
    this.debtPaid.patchValue(this.expensePaid());
    this.debtPaid.disable();
  }

  payDebt(paid: boolean) {
    // TODO enable when "even out bills is properly implemented"
    // this.debtPaid.patchValue(paid, { emitEvent: false });
    // this.payExpense.emit(this.expense.id);
  }

  private expensePaid(): boolean {
    return this.expense.debtors.find(debtor =>
      debtor.name === this.flatmateService.currentFlatmate.name).paid;
  }
}
