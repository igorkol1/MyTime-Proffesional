import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Activity} from '../../../../models/activity.model';
import {ActivityService} from '../../../../services/activity/activity.service';
import {ProjectService} from '../../../../services/project/project.service';
import {Project} from '../../../../models/project.model';
import {AuthorizationService} from '../../../../services/authorization/authorization.service';
import {User} from '../../../../models/user.model';
import {DateUtils} from '../../../../utils/date.utils';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {

  @Input()
  newActivity: boolean = false;

  @Input()
  activity: Activity = new Activity();

  private selectedProject;

  private rawDate: NgbDate;

  private projectList: Project[] = [];

  constructor(
    private activityService: ActivityService,
    private projectService: ProjectService,
    private authorizationService: AuthorizationService,
    public activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {
    this.activity.user = new User();
    this.activity.user.email = this.authorizationService.authorizationStatus.email;

    let date = new Date();

    if (this.newActivity) {
      date = new Date();
      this.selectedProject = 'Select project...';
    } else {
      date = new Date(this.activity.start);
      this.selectedProject = this.activity.project.name;
    }

    this.rawDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());


    this.projectService.getActiveProjects().subscribe(
      response => {
        this.projectList = <Project[]>response;
      }
    );
  }

  handleSave() {
    this.activity.start = this.formatProperDate();

    this.activityService.saveActivity(this.activity).subscribe(
      response => {
        this.activeModal.close('success');
      },
      error => {
        console.warn(error);
      }
    );
  }

  handleCancel() {
    this.activeModal.dismiss();
  }

  formatProperDate() {
    let properDate = new Date();
    properDate.setUTCFullYear(this.rawDate.year);
    properDate.setUTCMonth(this.rawDate.month - 1);
    properDate.setUTCDate(this.rawDate.day);
    return properDate;
  }

  handleProjectChange($event: any) {
    this.activity.project = this.projectList.find(project => project.name === $event);
  }

  isSelectedProjectValid() {
    if (this.projectList && this.activity.project) {
      return this.projectList.findIndex(project => project.id === this.activity.project.id) !== -1;
    }
    return false;
  }
}
