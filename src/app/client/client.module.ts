import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {CalculateExpensesComponent} from "./calculate-expenses/calculate-expenses.component";
import {ClientDashboardComponent} from "./client-dashbord/client-dashboard.component";
import {DisplayExpensesComponent} from "./display-expenses/display-expenses.component";
import {SharedModule} from "../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {ChooseFlatmateDialogComponent} from "./choose-flatmate/choose-flatmate-dialog.component";
import { AbsValuePipe } from './display-expenses/abs-value.pipe';

@NgModule({
  declarations: [
    CalculateExpensesComponent,
    ClientDashboardComponent,
    DisplayExpensesComponent,
    ChooseFlatmateDialogComponent,
    AbsValuePipe
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
