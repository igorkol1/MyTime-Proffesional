import {Component, OnInit} from '@angular/core';
import {NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Activity} from '../../../models/activity.model';
import {ActivityService} from '../../../services/activity/activity.service';
import {ActivityFormComponent} from '../../commons/activity-components/activity-form/activity-form.component';

@Component({
  selector: 'app-user-web-report',
  templateUrl: './user-web-report.component.html',
  styleUrls: ['./user-web-report.component.scss']
})
export class UserWebReportComponent implements OnInit {

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
