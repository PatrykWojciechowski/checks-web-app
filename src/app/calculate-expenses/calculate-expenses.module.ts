import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalculateExpensesComponent} from "./calculate-expenses.component";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    CalculateExpensesComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ]
})
export class CalculateExpensesModule { }
