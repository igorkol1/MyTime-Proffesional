import {Component, OnInit} from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Activity} from '../../../models/activity.model';
import {ProjectService} from '../../../services/project/project.service';
import {Project} from '../../../models/project.model';
import {ActivityService} from '../../../services/activity/activity.service';
import {DateUtils} from '../../../utils/date.utils';

@Component({
  selector: 'app-manager-project-activities',
  templateUrl: './manager-project-activities.component.html',
  styleUrls: ['./manager-project-activities.component.scss']
})
export class ManagerProjectActivitiesComponent implements OnInit {

  private rawContextDate: NgbDate;
  private activityList: Activity[];
  private activityListError: string;
  private activityListLoading: boolean;

  selectedProject: Project;
  selectedProjectName;

  constructor(
    private projectService: ProjectService,
    private activityService: ActivityService
  ) {
  }

  ngOnInit() {
    this.projectService.refresh();
    this.rawContextDate = DateUtils.formatToNGBDate(new Date());
    this.selectedProject = this.projectService.projectList[0];
    this.setSelectedProjectName();
    this.getActivity();
  }

  handleRefresh() {
    this.getActivity();
  }

  onChange($event: any) {
    this.getActivity();
  }

  getActivity() {
    if (this.selectedProject != null) {
      this.activityListError = '';
      this.activityListLoading = true;
      this.activityService.getActivitiesPerDayForSelectedProject(this.selectedProject, this.rawContextDate).subscribe(response => {
        this.activityList = <Activity[]>response;
        this.activityListLoading = false;
      }, error => {
        this.activityListError = error;
        this.activityListLoading = false;
      });
    }
  }

  handleProjectChange($event: any) {
    this.selectedProject = this.projectService.projectList.find(project => project.name === $event);
    this.getActivity();
  }

  setSelectedProjectName() {
    if (this.selectedProject != null) {
      this.selectedProjectName = this.selectedProject.name;
    } else {
      this.selectedProjectName = 'Select project';
    }
  }
}
