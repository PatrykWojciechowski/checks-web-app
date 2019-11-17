import {Component, OnInit} from '@angular/core';
import {HEROES} from "./hero";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'checks-app';
  heroes = HEROES;

  constructor(private router: Router) { }

  ngOnInit() { }

  chooseHero(heroId: number) {
    this.router.navigateByUrl('/calculate-expenses/' + heroId);
  }
}
