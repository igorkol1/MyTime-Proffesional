import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../../../models/activity.model';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {

  @Input()
  date: Date;

  @Input()
  activities: Activity[];

  constructor() {
  }

  ngOnInit() {
  }

  handleClick() {
    debugger;
  }
}
