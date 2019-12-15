import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService, private location: Location) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  goBack() {
    this.location.back();
  }
}
