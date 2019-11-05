import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {API_URL} from '../../app.constans';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getReport(isManager: boolean, month: number, year: number) {
    let url: string;

    if (isManager) {
      url = API_URL + 'report/manager/' + month + '/' + year;
    } else {
      url = API_URL + 'report/user/' + month + '/' + year;
    }

    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
    };

    return this.http.get<any>(url, httpOptions);
  }
}
