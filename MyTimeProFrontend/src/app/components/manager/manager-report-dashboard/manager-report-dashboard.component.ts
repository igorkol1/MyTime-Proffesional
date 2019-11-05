import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../services/report/report.service';

@Component({
  selector: 'app-manager-report-dashboard',
  templateUrl: './manager-report-dashboard.component.html',
  styleUrls: ['./manager-report-dashboard.component.scss']
})
export class ManagerReportDashboardComponent implements OnInit {

  constructor(
    private reportService: ReportService
  ) {
  }

  ngOnInit() {
  }

  navigateToEmailReport() {

  }

  navigateToPDFReport() {
    //ToDo: Allow user to pick custom date
    var today = new Date();

    this.reportService.getReport(true, today.getMonth() + 1, today.getFullYear()).subscribe((response) => {
      let file = new Blob([response], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }
}
