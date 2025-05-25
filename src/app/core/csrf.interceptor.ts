import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const mutative = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);

    if (mutative) {
      // OBTAIN CSRF TOKEN
      return this.http
        .get<{ csrfToken: string }>('/api/get-csrf-token/', { withCredentials: true })
        .pipe(
          switchMap(res => {
            sessionStorage.setItem('csrfToken', res.csrfToken);
            // 2) SEND AGAIN WITH CSRF TOKEN
            const clone = req.clone({
              withCredentials: true,
              setHeaders: { 'X-CSRFToken': res.csrfToken }
            });
            return next.handle(clone);
          })
        );
    }
    return next.handle(req.clone({ withCredentials: true }));
  }
}