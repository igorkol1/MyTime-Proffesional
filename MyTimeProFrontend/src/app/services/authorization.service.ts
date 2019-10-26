import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {LoginResponseModel} from '../models/responses/loginResponse.model';
import {API_URL} from '../app.constans';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  header: HttpHeaders;
  authorizationStatus: LoginResponseModel;
  isLoading = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  authorize(user: User) {
    this.isLoading = true;
    this.http.post<LoginResponseModel>(API_URL + 'user/login', user).subscribe(
      response => {
        this.authorizationStatus = response;
        this.isLoading = false;
      },
      error => {
        console.warn(error);
      });
  }


}
