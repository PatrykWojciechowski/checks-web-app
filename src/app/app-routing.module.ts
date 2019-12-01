import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CalculateExpensesComponent} from "./calculate-expenses/calculate-expenses.component";
import {ClientDashboardComponent} from "./client-dashbord/client-dashboard.component";
import {DisplayExpensesComponent} from "./display-expenses/display-expenses.component";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'client-dashboard/:id', component: ClientDashboardComponent },
  { path: 'calculate-expenses/:id', component: CalculateExpensesComponent },
  { path: 'show-expenses/:id', component: DisplayExpensesComponent },
  { path: '',  redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
