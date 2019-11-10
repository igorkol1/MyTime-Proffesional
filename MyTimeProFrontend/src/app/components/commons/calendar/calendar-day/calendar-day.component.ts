import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Activity} from '../../../../models/activity.model';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit, OnChanges {

  @Input()
  date: Date;

  @Input()
  activities: Activity[];

  numberOfHours = 0;

  constructor() {
  }

  ngOnInit() {
    this.evaluateNumberOfHours();
  }

  handleClick() {
    debugger;
  }

  evaluateNumberOfHours() {
    this.numberOfHours = 0;
    if (this.activities) {
      this.activities.forEach(activity => {
        this.numberOfHours += Number(activity.duration);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.evaluateNumberOfHours();
  }
}
