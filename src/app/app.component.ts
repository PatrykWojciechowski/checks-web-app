import { Component } from '@angular/core';
import {HeroService} from "./calculate-expenses/hero.service";
import {ExpensesService} from "./display-expenses/expenses.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HeroService, ExpensesService]
})
export class AppComponent {
}
