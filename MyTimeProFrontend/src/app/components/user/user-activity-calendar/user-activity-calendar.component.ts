import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../../../services/activity/activity.service';
import {Activity} from '../../../models/activity.model';

@Component({
  selector: 'app-user-activity-calendar',
  templateUrl: './user-activity-calendar.component.html',
  styleUrls: ['./user-activity-calendar.component.scss']
})
export class UserActivityCalendarComponent implements OnInit {

  activities: Activity[] = [];

  constructor(private activityService: ActivityService) {
  }

  ngOnInit() {
    this.activityService.getActivitiesForUserPerMonth(11, 2019).subscribe(
      response => {
        this.activities = <Activity[]>response;
      },
      error => {
        console.warn(error);
      }
    );

  }

}
