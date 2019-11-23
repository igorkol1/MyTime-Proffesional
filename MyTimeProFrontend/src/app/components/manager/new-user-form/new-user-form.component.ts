import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.scss']
})
export class NewUserFormComponent implements OnInit {

  private confirmPassword: string;

  @Input()
  user: User = new User();

  @Input()
  newUser: boolean = false;

  changePassword: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService
  ) {
  }

  ngOnInit() {
  }

  handleSave() {

    if (!(this.newUser || this.changePassword)) {
      this.user.password = '';
    }

    this.userService.saveUser(this.user);
    this.activeModal.close();
  }

  handleCancel() {
    this.activeModal.close('Close click');
  }
}
