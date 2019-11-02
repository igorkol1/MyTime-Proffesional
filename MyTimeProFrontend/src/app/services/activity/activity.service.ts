import {Injectable} from '@angular/core';
import {Activity} from '../../models/activity.model';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../app.constans';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private http: HttpClient
  ) {
  }

  saveActivity(activity: Activity) {
    return this.http.post(API_URL + 'activity/save', activity);
  }

  getActivitiesPerDayForUser(date: NgbDate) {
    return this.http.get(API_URL + 'activity/user/' + date.year + '/' + date.month + '/' + date.day);
  }

  getActivitiesPerDayForSelectedUser(user: User, date: NgbDate) {
    return this.http.get(API_URL + 'activity/' + user.email + '/' + date.year + '/' + date.month + '/' + date.day);
  }

  delete(activity: Activity) {
    return this.http.post(API_URL + 'activity/delete/' + activity.id, null);
  }
}
