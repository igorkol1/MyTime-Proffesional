import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Activity} from '../../../../models/activity.model';
import {ActivityService} from '../../../../services/activity/activity.service';
import {ProjectService} from '../../../../services/project/project.service';

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

  constructor(
    private activityService: ActivityService,
    private projectService: ProjectService,
    public activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {

  }

  handleSave() {
    return false;
  }

  handleCancel() {
    this.activeModal.dismiss();
  }
}
