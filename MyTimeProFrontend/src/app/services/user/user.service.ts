import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';
import {API_URL} from '../../app.constans';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList = [];
  userListLoading = false;
  userListError;

  constructor(
    private http: HttpClient
  ) {
    this.getUsers();
  }

  public refresh() {
    this.getUsers();
  }

  public getUsers() {
    this.userListLoading = true;
    this.http.get(API_URL + 'user/all').subscribe(
      response => {
        this.userListLoading = false;
        this.userList = <User[]>response;
      },
      error => {
        this.userListLoading = false;
        this.userListError = error;
        console.warn(error);
      }
    );
  }
}
