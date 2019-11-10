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

  @Input()
  month: number;

  @Input()
  year: number;

  dates: Date[];

  constructor() {
    const currentDate = new Date();
    this.month = currentDate.getMonth();
    this.year = currentDate.getFullYear();
    this.dates = DateUtils.getDaysInMonth(this.month, this.year);
  }

  ngOnInit() {
    this.dates = DateUtils.getDaysInMonth(this.month, this.year);
  }

  findActivitiesForDay(date: Date): Activity[] {
    if (this.activities && this.activities.length > 0) {
      return this.activities.filter(activity => this.isActivityForDate(activity, date));
    }
  }

  private isActivityForDate(activity: Activity, date: Date) {
    const str: any = activity.start;
    const dateStr: any = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + this.pad(date.getDate().toString());

    return str === dateStr;
  }

  private pad(str: string) {
    while (str.length < 2) {
      str = '0' + str;
    }
    return str;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dates = DateUtils.getDaysInMonth(this.month - 1, this.year);
  }

}
