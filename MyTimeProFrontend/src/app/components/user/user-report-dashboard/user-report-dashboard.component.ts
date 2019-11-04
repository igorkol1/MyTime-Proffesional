import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {API_URL} from '../../../app.constans';
import {ReportService} from '../../../services/report/report.service';

@Component({
  selector: 'app-user-report-dashboard',
  templateUrl: './user-report-dashboard.component.html',
  styleUrls: ['./user-report-dashboard.component.scss']
})
export class UserReportDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private reportService: ReportService
  ) {
  }

  ngOnInit() {
  }

  navigateToPDFReport() {

    //ToDo: Allow user to pick custom date
    var today = new Date();

    this.reportService.getUserReport(today.getMonth()+1, today.getFullYear()).subscribe((response) => {

      let file = new Blob([response], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  navigateToEmailReport() {

  }
}
