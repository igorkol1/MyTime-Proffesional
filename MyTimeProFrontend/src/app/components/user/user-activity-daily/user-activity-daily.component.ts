import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivityFormComponent} from '../../commons/activity-components/activity-form/activity-form.component';
import {NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DateUtils} from '../../../utils/date.utils';
import {Activity} from '../../../models/activity.model';
import {ActivityService} from '../../../services/activity/activity.service';

@Component({
  selector: 'app-user-activity-daily',
  templateUrl: './user-activity-daily.component.html',
  styleUrls: ['./user-activity-daily.component.scss']
})
export class UserActivityDailyComponent implements OnInit {

  private rawContextDate: NgbDate;
  private activityList: Activity[];
  private activityListError: string;
  private activityListLoading: boolean;

  constructor(
    private modalService: NgbModal,
    private activityService: ActivityService
  ) {
  }

  ngOnInit() {
    this.rawContextDate = DateUtils.formatToNGBDate(new Date());
    this.getActivity();
  }

  handleAddActivity() {
    const modalRef = this.modalService.open(ActivityFormComponent);
    modalRef.componentInstance.newActivity = true;
  }

  handleRefresh() {
    this.getActivity();
  }

  onChange($event: any) {
    this.getActivity();
  }

  getActivity() {
    this.activityListError = '';
    this.activityListLoading = true;
    this.activityService.getActivitiesPerDayForUser(this.rawContextDate).subscribe(response => {
      this.activityList = <Activity[]>response;
      this.activityListLoading = false;
    }, error => {
      this.activityListError = error;
      this.activityListLoading = false;
    });
  }
}
