import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = this.fb.group({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private fb: FormBuilder,
    public auth: AuthService
  ) {}

  login() {
    this.auth.login(this.form.value['username'], this.form.value['password']);
  }
}
