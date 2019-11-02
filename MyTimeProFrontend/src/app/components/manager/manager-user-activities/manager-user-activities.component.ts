import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {Activity} from '../../../models/activity.model';
import {DateUtils} from '../../../utils/date.utils';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {ActivityService} from '../../../services/activity/activity.service';

@Component({
  selector: 'app-manager-user-activities',
  templateUrl: './manager-user-activities.component.html',
  styleUrls: ['./manager-user-activities.component.scss']
})
export class ManagerUserActivitiesComponent implements OnInit {

  private rawContextDate: NgbDate;
  private activityList: Activity[];
  private activityListError: string;
  private activityListLoading: boolean;

  selectedUser: User;

  constructor(
    private userService: UserService,
    private activityService: ActivityService
  ) {
  }

  ngOnInit() {
    this.userService.refresh();
    this.rawContextDate = DateUtils.formatToNGBDate(new Date());
    this.selectedUser = this.userService.userList[0];
    this.getActivity();
  }

  handleRefresh() {
    this.getActivity();
  }

  onChange($event: any) {
    this.getActivity();
  }

  getActivity() {
    if (this.selectedUser != null) {
      console.warn("Loading activities");
      this.activityListError = '';
      this.activityListLoading = true;
      this.activityService.getActivitiesPerDayForSelectedUser(this.selectedUser, this.rawContextDate).subscribe(response => {
        this.activityList = <Activity[]>response;
        this.activityListLoading = false;
      }, error => {
        this.activityListError = error;
        this.activityListLoading = false;
      });
    }
  }
}
