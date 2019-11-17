import { Component, OnInit } from '@angular/core';
import {HEROES} from "./hero";

@Component({
  selector: 'app-landing-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'checks-app';
  heroes = HEROES;

  constructor() { }

  ngOnInit() { }

  chooseHero() {
    console.log("Hero chosen!")
  }
}
