import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Activity} from '../../../../models/activity.model';
import {ProjectService} from '../../../../services/project/project.service';
import {UserService} from '../../../../services/user/user.service';
import {User} from '../../../../models/user.model';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';

@Component({
  selector: 'app-manager-report',
  templateUrl: './manager-report.component.html',
  styleUrls: ['./manager-report.component.scss']
})
export class ManagerReportComponent implements OnInit, OnChanges {

  @Input()
  activities: Activity[];

  allHours: number = 0;
  projectView: boolean = true;
  userView: boolean = false;

  chartData: any;
  lineChartDate: any;
  public doughnutChartType: ChartType = 'doughnut';

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor(private projectService: ProjectService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.projectService.refresh();
    this.userService.refresh();
    this.countAllReportedHours();
    this.calculateChartData();
    this.calculateLineChartData();
  }

  countAllReportedHours() {
    return this.activities.forEach(activity => this.allHours += activity.duration);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.projectService.refresh();
    this.userService.refresh();
    this.countAllReportedHours();
    this.calculateChartData();
    this.calculateLineChartData();
  }

  countNumberOfHoursInProject(project: any) {
    const activitiesInProject = this.activities.filter(activity => activity.project.id === project.id);
    let numberOfHours = 0;
    activitiesInProject.forEach(activities => numberOfHours += activities.duration);
    return numberOfHours;
  }

  countNumberOfHoursForUser(user: User) {
    let numberOfUserHours = 0;
    this.activities.filter(activity => activity.worker.id === user.id)
      .forEach(activity => numberOfUserHours += activity.duration);
    return numberOfUserHours;
  }

  handleProjectView() {
    this.projectView = true;
    this.userView = false;
    this.calculateChartData();
  }

  handleUserView() {
    this.projectView = false;
    this.userView = true;
    this.calculateLineChartData();
  }

  calculateChartData() {
    let labels: Label[] = [];
    let projectHours: number[] = [];
    this.projectService.projectList.forEach(project => {
      labels.push(project.name);
      projectHours.push(this.countNumberOfHoursInProject(project));
    });
    this.chartData = {labels, projectHours};
  }

  calculateLineChartData() {
    let labels: Label[] = [];
    let userDataSets: ChartDataSets[] = [];
    userDataSets.push({data: [], label: 'User Hours'});
    this.userService.userList.forEach(user => {
      labels.push(user.email);
      userDataSets[0].data.push(this.countNumberOfHoursForUser(user));
    });
    this.lineChartDate = {labels, userDataSets};
  }
}
