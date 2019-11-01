import { Injectable } from '@angular/core';
import {Activity} from '../../models/activity.model';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../app.constans';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private http: HttpClient
  ) { }

  saveActivity(activity: Activity) {
    return this.http.post(API_URL+'activity/save',activity);
  }
}
