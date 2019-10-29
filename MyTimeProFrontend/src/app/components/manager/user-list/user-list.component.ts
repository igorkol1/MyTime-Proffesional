import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewUserFormComponent} from '../new-user-form/new-user-form.component';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.userService.refresh();
  }

  handleRefresh() {
    this.userService.refresh();
  }

  handleAddUser() {
    const modalRef = this.modalService.open(NewUserFormComponent);
    modalRef.componentInstance.newUser = true;
  }

  handleEditUser(user: User) {
    const modalRef = this.modalService.open(NewUserFormComponent);
    modalRef.componentInstance.user = Object.assign(user);
  }
}
