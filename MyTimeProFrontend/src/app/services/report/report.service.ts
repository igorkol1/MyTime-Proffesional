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

  public getUserReport() {
    const url = API_URL + 'report/test';

    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
    };

    return this.http.get<any>(url, httpOptions);
  }
}
