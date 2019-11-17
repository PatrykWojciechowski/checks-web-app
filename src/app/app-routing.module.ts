import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from "./landing-page/landing-page.component";

const appRoutes: Routes = [
  { path: 'checks', component: LandingPageComponent },
  { path: '',  redirectTo: '/checks', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
