import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./core/login/login.component";

const appRoutes: Routes = [
  { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule)},
  { path: 'login', component: LoginComponent },
  { path: '',  redirectTo: '/client', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
