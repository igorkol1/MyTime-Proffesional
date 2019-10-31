import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-activities-dashboard',
  templateUrl: './user-activities-dashboard.component.html',
  styleUrls: ['./user-activities-dashboard.component.scss']
})
export class UserActivitiesDashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  cloneDay() {

  }

  navigateToDayView() {
    this.router.navigate(['user/activities/daily']);
  }

  navigateToCalendarView() {

  }
}
