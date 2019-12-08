import {Component, OnInit} from '@angular/core';
import {HEROES} from "../hero";
import {Router} from "@angular/router";
import {HeroService} from "../calculate-expenses/hero.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'checks-app';
  heroes$ = this.heroService.heroes$;

  constructor(private router: Router, private heroService: HeroService) { }

  ngOnInit() {}

  chooseHero(heroId: number) {
    this.router.navigateByUrl('/client-dashboard/' + heroId);
  }
}
