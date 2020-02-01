import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ChooseFlatmateDialogComponent} from '../choose-flatmate/choose-flatmate-dialog.component';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent {


  constructor(private auth: AuthService,
              public dialog: MatDialog,
              private router: Router
  ) {}

  navigateToCalculate() {
    this.router.navigateByUrl('/client/calculate-expenses');
  }

  navigateToDisplay() {
    this.router.navigateByUrl('/client/display-expenses');
  }
}
