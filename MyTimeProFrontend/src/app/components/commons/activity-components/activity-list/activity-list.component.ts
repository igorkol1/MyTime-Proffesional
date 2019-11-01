import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../../../models/activity.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivityFormComponent} from '../activity-form/activity-form.component';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  @Input()
  activities: Activity[] = [];

  constructor(
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
  }

  handleEditActivity(activity: Activity) {
    const modalRef = this.modalService.open(ActivityFormComponent);
    modalRef.componentInstance.newActivity = true;
    modalRef.componentInstance.activity = activity;
  }
}
