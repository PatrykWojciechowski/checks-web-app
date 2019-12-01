import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeModule} from "./home/home.module";
import {RouterModule} from "@angular/router";
import {CalculateExpensesModule} from "./calculate-expenses/calculate-expenses.module";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database"
import {environment} from "../environments/environment";
import {AngularFirestore} from "@angular/fire/firestore";
import {ClientDashbordModule} from "./client-dashbord/client-dashbord.module";
import {DisplayExpensesModule} from "./display-expenses/display-expenses.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    CalculateExpensesModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ClientDashbordModule,
    DisplayExpensesModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
