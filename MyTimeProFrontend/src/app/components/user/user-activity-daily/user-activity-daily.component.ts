import { Component, OnInit } from '@angular/core';
import {ActivityFormComponent} from '../../commons/activity-components/activity-form/activity-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-activity-daily',
  templateUrl: './user-activity-daily.component.html',
  styleUrls: ['./user-activity-daily.component.scss']
})
export class UserActivityDailyComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  handleAddActivity() {
    const modalRef = this.modalService.open(ActivityFormComponent);
    modalRef.componentInstance.newActivity = true;
  }
}
