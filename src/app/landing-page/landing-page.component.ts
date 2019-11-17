import { Component, OnInit } from '@angular/core';
import {HEROES} from "./hero";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  title = 'checks-app';
  heroes = HEROES;

  constructor() { }

  ngOnInit() { }

  chooseHero() {
    console.log("Hero chosen!")
  }
}
