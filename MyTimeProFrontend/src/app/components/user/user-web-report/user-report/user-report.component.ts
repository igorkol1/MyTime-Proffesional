import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Activity} from '../../../../models/activity.model';
import {ProjectService} from '../../../../services/project/project.service';
import {Project} from '../../../../models/project.model';
import {Label, MultiDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent implements OnInit, OnChanges {


  public chartData: any;

  public doughnutChartType: ChartType = 'doughnut';

  @Input()
  activities: Activity[];
  totalReportedHours = 0;

  constructor(
    private projectService: ProjectService
  ) {
  }

  ngOnInit() {
    this.countNumberOfHours();
    this.projectService.refresh();
    this.generateChartDate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.countNumberOfHours();
    this.projectService.refresh();
    this.generateChartDate();
  }

  countNumberOfHours() {
    this.totalReportedHours = 0;
    this.activities.forEach(activities => this.totalReportedHours += activities.duration);
  }

  countNumberOfHoursInProject(project: Project) {
    const activitiesInProject = this.activities.filter(activity => activity.project.id === project.id);
    let numberOfHours = 0;
    activitiesInProject.forEach(activities => numberOfHours += activities.duration);
    return numberOfHours;
  }

  generateChartDate() {
    let labels: Label[] = [];
    let projectHours: number[] = [];
    this.projectService.projectList.forEach(project => {
      labels.push(project.name);
      projectHours.push(this.countNumberOfHoursInProject(project));
    });
    this.chartData = {labels, projectHours};
  }
}
