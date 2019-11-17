import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingPageComponent} from "./landing-page.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class LandingPageModule { }
