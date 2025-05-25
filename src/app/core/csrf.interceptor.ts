import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const mutative = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
    const csrfToken = sessionStorage.getItem('csrfToken');

    if (mutative && csrfToken) {
      const clone = req.clone({
        withCredentials: true,
        setHeaders: { 'X-CSRFToken': csrfToken }
      });
      return next.handle(clone);
    }

    return next.handle(req.clone({ withCredentials: true }));
  }
}