import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-activities-dashboard',
  templateUrl: './activities-dashboard.component.html',
  styleUrls: ['./activities-dashboard.component.scss']
})
export class ActivitiesDashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateToProjectActivities() {

  }

  navigateToUserActivities() {
    this.router.navigate(['manager/user/activities']);
  }
}
