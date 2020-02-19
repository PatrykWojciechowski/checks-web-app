import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {GoogleLoginComponent} from './google-auth/google-login.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth.guard";
import {FlatmateNamePipe} from './flatmate-name.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  providers: [
    AuthService,
    AuthGuard,
  ],
  declarations: [GoogleLoginComponent, FlatmateNamePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  exports: [
    ReactiveFormsModule,
    MatTableModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatCheckboxModule,
    FlatmateNamePipe
  ]
})
export class SharedModule { }
