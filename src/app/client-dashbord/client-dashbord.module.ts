import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDashboardComponent } from './client-dashboard.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [ClientDashboardComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
  ],

})
export class ClientDashbordModule { }
