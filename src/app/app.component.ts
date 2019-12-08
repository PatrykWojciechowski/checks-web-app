import { Component } from '@angular/core';
import {HeroService} from "./calculate-expenses/hero.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HeroService]
})
export class AppComponent {
}
