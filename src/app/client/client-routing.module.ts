import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientDashboardComponent} from "./client-dashbord/client-dashboard.component";
import {CalculateExpensesComponent} from "./calculate-expenses/calculate-expenses.component";
import {DisplayExpensesComponent} from "./display-expenses/display-expenses.component";
import {AuthGuard} from "../shared/auth.guard";

const routes: Routes = [
  { path: '', component: ClientDashboardComponent, canActivate: [AuthGuard] },
  { path: 'calculate-expenses', component: CalculateExpensesComponent, canActivate: [AuthGuard] },
  { path: 'display-expenses', component: DisplayExpensesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
