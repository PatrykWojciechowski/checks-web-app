import { Component } from '@angular/core';
import {HEROES} from "./hero";
import {HeroService} from "./calculate-expenses/hero.service";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HeroService, AngularFirestore]
})
export class AppComponent {
}
