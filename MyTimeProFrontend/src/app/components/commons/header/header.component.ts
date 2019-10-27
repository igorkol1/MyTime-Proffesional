import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../../services/authorization/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {
  }

  handleLogout() {
    this.authorizationService.logout();
  }
}
