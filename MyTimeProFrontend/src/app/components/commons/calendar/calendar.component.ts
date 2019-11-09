import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DateUtils} from '../../../utils/date.utils';
import {Activity} from '../../../models/activity.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input()
  activities: Activity[] = [];

  dates = DateUtils.getDaysInMonth(10, 2019);

  constructor() {
  }

  ngOnInit() {
  }

  findActivitiesForDay(date: Date): Activity[] {
    if (this.activities && this.activities.length > 0) {
      return this.activities.filter(activity => this.isActivityForDate(activity, date));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.warn(this.activities.length);
  }

  private isActivityForDate(activity: Activity, date: Date) {
    let str: any = activity.start;
    let dateStr: any = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    return str === dateStr;
  }

}
