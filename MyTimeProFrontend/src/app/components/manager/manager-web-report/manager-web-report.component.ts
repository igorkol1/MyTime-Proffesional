import { Component, OnInit } from '@angular/core';
import {Activity} from '../../../models/activity.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivityService} from '../../../services/activity/activity.service';
import {ActivityFormComponent} from '../../commons/activity-components/activity-form/activity-form.component';

@Component({
  selector: 'app-manager-web-report',
  templateUrl: './manager-web-report.component.html',
  styleUrls: ['./manager-web-report.component.scss']
})
export class ManagerWebReportComponent implements OnInit {

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
    this.activityService.getActivitiesForMonth(this.selectedMonth, this.selectedYear).subscribe(
      response => {
        this.activities = <Activity[]>response;
      },
      error => {
        console.warn(error);
      }
    );
  }

}
