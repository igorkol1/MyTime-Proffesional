import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../services/authorization.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new User('', '');

  constructor(
    private authorizationService: AuthorizationService
  ) {
  }

  ngOnInit() {
  }

  handleLogin() {
    this.authorizationService.authorize(this.user);
  }

  handleDebug() {
    debugger;
  }
}
