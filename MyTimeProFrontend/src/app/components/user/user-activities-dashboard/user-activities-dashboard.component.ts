import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivityFormComponent} from '../../commons/activity-components/activity-form/activity-form.component';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-activities-dashboard',
  templateUrl: './user-activities-dashboard.component.html',
  styleUrls: ['./user-activities-dashboard.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class UserActivitiesDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private modalService: NgbModal,
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

  navigateToNewActivity() {
    const modalRef = this.modalService.open(ActivityFormComponent);
    modalRef.componentInstance.newActivity = true;
  }
}
