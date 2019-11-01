import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

export class DateUtils {

  static formatToNGBDate(date: Date) {
    return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

}
