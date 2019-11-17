import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-calculate-expenses',
  templateUrl: './calculate-expenses.component.html',
  styleUrls: ['./calculate-expenses.component.scss']
})
export class CalculateExpensesComponent implements OnInit {

  heroId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.heroId = this.route.snapshot.params['id']
    console.log("Hero choosen --> ", this.heroId);
  }

}
