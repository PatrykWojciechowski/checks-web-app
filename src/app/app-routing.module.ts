import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CalculateExpensesComponent} from "./calculate-expenses/calculate-expenses.component";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'calculate-expenses/:id', component: CalculateExpensesComponent },
  { path: '',  redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
