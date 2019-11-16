import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {CloneDayRequestModel} from '../../../models/requests/cloneDayRequest.model';
import {formatDate} from '@angular/common';
import {DateUtils} from '../../../utils/date.utils';
import {ActivityService} from '../../../services/activity/activity.service';

@Component({
  selector: 'app-user-activity-clone',
  templateUrl: './user-activity-clone.component.html',
  styleUrls: ['./user-activity-clone.component.scss']
})
export class UserActivityCloneComponent implements OnInit {

  cloneDayRequest: CloneDayRequestModel;
  rawActivityDate: NgbDate;
  rawStartDate: NgbDate;
  rawEndDate: NgbDate;

  constructor(
    public activeModal: NgbActiveModal,
    private activityService: ActivityService) {
  }

  ngOnInit() {

  }

  handleClone() {
    this.cloneDayRequest = new CloneDayRequestModel(
      DateUtils.formatToDate(this.rawActivityDate),
      DateUtils.formatToDate(this.rawStartDate),
      DateUtils.formatToDate(this.rawEndDate)
    );

    this.activityService.cloneDay(this.cloneDayRequest).subscribe(
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

  isDatesCorrect() {
    if (this.rawStartDate && this.rawEndDate) {
      if (this.rawStartDate.year <= this.rawEndDate.year) {
        if (this.rawStartDate.month <= this.rawEndDate.month) {
          if (this.rawStartDate.day <= this.rawEndDate.day) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  }
}
