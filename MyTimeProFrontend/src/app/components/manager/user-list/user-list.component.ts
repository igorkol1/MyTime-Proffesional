import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.refresh();
  }

}
