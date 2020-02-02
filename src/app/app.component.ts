import { Component } from '@angular/core';
import {FlatmateService} from "./shared/flatmate.service";
import {ExpensesFacade} from "./client/display-expenses/expenses-facade.service";
import {ExpenseService} from './shared/expense.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FlatmateService, ExpenseService, ExpensesFacade]
})
export class AppComponent {
}
