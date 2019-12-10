import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import {CalculateExpensesComponent} from "./calculate-expenses/calculate-expenses.component";
import {ClientDashboardComponent} from "./client-dashbord/client-dashboard.component";
import {DisplayExpensesComponent} from "./display-expenses/display-expenses.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    CalculateExpensesComponent,
    ClientDashboardComponent,
    DisplayExpensesComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
  ]
})
export class ClientModule { }
