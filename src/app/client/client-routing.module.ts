import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientDashboardComponent} from "./client-dashbord/client-dashboard.component";
import {CalculateExpensesComponent} from "./calculate-expenses/calculate-expenses.component";
import {DisplayExpensesComponent} from "./display-expenses/display-expenses.component";

const routes: Routes = [
  { path: ':id', component: ClientDashboardComponent },
  { path: ':id/calculate-expenses', component: CalculateExpensesComponent },
  { path: ':id/display-expenses', component: DisplayExpensesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
