import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Activity} from '../../../../models/activity.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivityFormComponent} from '../activity-form/activity-form.component';
import {ActivityService} from '../../../../services/activity/activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  @Input()
  activities: Activity[] = [];

  @Input()
  editOption: boolean;

  @Input()
  showUser: boolean;

  @Output()
  refreshData: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private modalService: NgbModal,
    private activityService: ActivityService
  ) {
  }

  ngOnInit() {
  }

  handleEditActivity(activity: Activity) {
    const modalRef = this.modalService.open(ActivityFormComponent);
    modalRef.componentInstance.newActivity = false;
    modalRef.componentInstance.activity = activity;

    modalRef.result.then((result) => {
      if (result === 'success') {
        this.refreshData.emit();
      }
    });
  }

  handleDelete(activity: Activity) {
    this.activityService.delete(activity).subscribe(response => {
      this.refreshData.emit();
    }, error => {
      console.warn(error);
    });
  }
}
