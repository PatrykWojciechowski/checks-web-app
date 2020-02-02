import {Component} from '@angular/core';
import {Location} from '@angular/common';

import {AuthService} from '../../shared/auth.service';
import {Observable} from 'rxjs';
import {User} from '../../models/expense.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  currentUser$: Observable<User> = this.authService.userData$;

  constructor(
    private authService: AuthService,
    private location: Location
  ) {}

  logout() {
    this.authService.logout();
  }

  goBack() {
    this.location.back();
  }
}
