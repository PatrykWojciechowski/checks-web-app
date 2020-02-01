import {Component} from '@angular/core';
import {Location} from '@angular/common';

import {AuthService} from '../../shared/auth.service';
import {User} from '../../shared/user.model';
import {Observable} from 'rxjs';

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
