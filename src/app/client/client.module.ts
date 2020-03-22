import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {AddExpenseComponent} from "./add-expense/add-expense.component";
import {ClientDashboardComponent} from "./client-dashbord/client-dashboard.component";
import {DisplayExpensesComponent} from "./display-expenses/display-expenses.component";
import {SharedModule} from "../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {ChooseFlatmateDialogComponent} from "./choose-flatmate/choose-flatmate-dialog.component";
import { AbsValuePipe } from '../shared/abs-value.pipe';
import { DebtPaidComponent } from './display-expenses/debt-payed/debt-paid.component';
import { EvenOutBillsComponent } from './even-out-bills/even-out-bills.component';

@NgModule({
  declarations: [
    AddExpenseComponent,
    ClientDashboardComponent,
    DisplayExpensesComponent,
    ChooseFlatmateDialogComponent,
    AbsValuePipe,
    DebtPaidComponent,
    EvenOutBillsComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    MatDialogModule
  ],
  entryComponents: [
    ChooseFlatmateDialogComponent
  ]
})
export class ClientModule { }
