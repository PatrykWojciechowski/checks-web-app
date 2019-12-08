import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayExpensesComponent } from './display-expenses.component';
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [DisplayExpensesComponent],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class DisplayExpensesModule { }
