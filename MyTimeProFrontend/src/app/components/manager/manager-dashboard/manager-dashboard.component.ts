import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  navigateToUserList() {
      this.router.navigate(['manager/user/list']);
  }

  navigateToProjectList() {
    this.router.navigate(['manager/project/list']);
  }

  navigateToReports() {
    this.router.navigate(['manager/report']);
  }
}
