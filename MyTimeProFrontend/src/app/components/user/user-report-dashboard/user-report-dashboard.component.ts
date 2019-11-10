import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {API_URL} from '../../../app.constans';
import {ReportService} from '../../../services/report/report.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivityFormComponent} from '../../commons/activity-components/activity-form/activity-form.component';
import {UserWebReportComponent} from '../user-web-report/user-web-report.component';

@Component({
  selector: 'app-user-report-dashboard',
  templateUrl: './user-report-dashboard.component.html',
  styleUrls: ['./user-report-dashboard.component.scss']
})
export class UserReportDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private reportService: ReportService,
  ) {
  }

  ngOnInit() {
  }

  navigateToPDFReport() {

    //ToDo: Allow user to pick custom date
    var today = new Date();

    this.reportService.getReport(false, today.getMonth() + 1, today.getFullYear()).subscribe((response) => {

      let file = new Blob([response], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  navigateToWebReport() {
    this.router.navigate(['user/report/web']);
  }
}
