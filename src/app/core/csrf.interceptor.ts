import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  // get stored csrf token
  private getStoredCsrf(): string {
    return sessionStorage.getItem('csrfToken') || '';
  }
  // intercept requests http
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.getStoredCsrf();

    // always send cookies
    let cloneConfig: {
      withCredentials: boolean;
      setHeaders?: { [name: string]: string };
    } = {
      withCredentials: true
    };

    // add headers for POST, PUT, PATCH, DELETE
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      cloneConfig = {
        withCredentials: true,
        setHeaders: {
          'X-CSRFToken': token,
          'Content-Type': 'application/json'
        }
      };
    }

    const clonedReq = req.clone(cloneConfig);
    return next.handle(clonedReq);
  }
}
