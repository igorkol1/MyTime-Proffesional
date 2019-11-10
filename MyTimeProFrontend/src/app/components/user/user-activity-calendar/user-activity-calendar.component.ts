import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivityService} from '../../../services/activity/activity.service';
import {Activity} from '../../../models/activity.model';
import {ActivityFormComponent} from '../../commons/activity-components/activity-form/activity-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-activity-calendar',
  templateUrl: './user-activity-calendar.component.html',
  styleUrls: ['./user-activity-calendar.component.scss']
})
export class UserActivityCalendarComponent implements OnInit {

  activities: Activity[] = [];

  selectedMonth;
  selectedYear;

  months = [];
  years = [];

  constructor(private modalService: NgbModal,
              private activityService: ActivityService) {
    const currentDate = new Date();

    this.selectedMonth = currentDate.getMonth() + 1;
    this.selectedYear = currentDate.getFullYear();

    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }

    for (let i = (currentDate.getFullYear() - 10); i <= currentDate.getFullYear(); i++) {
      this.years.push(i);
    }
  }

  ngOnInit() {
    this.getActivities();
  }

  handleRefresh() {
    this.getActivities();
  }

  getActivities() {
    this.activityService.getActivitiesForUserPerMonth(this.selectedMonth, this.selectedYear).subscribe(
      response => {
        this.activities = <Activity[]>response;
      },
      error => {
        console.warn(error);
      }
    );
  }

  handleAddActivity() {
    const modalRef = this.modalService.open(ActivityFormComponent);
    modalRef.componentInstance.newActivity = true;

    modalRef.result.then((result) => {
      if (result === 'success') {
        this.getActivities();
      }
    });
  }
}
