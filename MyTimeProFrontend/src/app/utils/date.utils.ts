import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

export class DateUtils {

  static formatToNGBDate(date: Date) {
    return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  static formatToDate(date: NgbDate) {
    let newDate = new Date();
    newDate.setUTCFullYear(date.year);
    newDate.setUTCMonth(date.month - 1);
    newDate.setUTCDate(date.day);
    return newDate;
  }

  static getDaysInMonth(month:number, year) {

    var date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(1);
    var days = [];
    console.warn(date.getMonth());
    console.warn(month);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
}
