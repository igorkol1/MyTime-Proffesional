import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthorizationService} from './authorization.service';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authorizationService: AuthorizationService,
    private route: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authorizationService.authorizationStatus.authorize) {
      request = request.clone({
        setHeaders: {
          Authorization: this.authorizationService.getToken()
        }
      });
    }
    return next.handle(request).pipe(map(event => {
        return event;
      }), catchError(err => {
        this.handleUnauthorizedError();
        return throwError(err);
      })
    );
  }

  private handleUnauthorizedError() {
    //this.authorizationService.logout();
  }

}
