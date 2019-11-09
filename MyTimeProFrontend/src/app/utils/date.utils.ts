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

}
