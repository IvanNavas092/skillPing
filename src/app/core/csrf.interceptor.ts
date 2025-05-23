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
  // extract the value of the csrftoken cookie
  private getCsrfToken(): string | null {
    const match = document.cookie.match(/(?:^|; )csrftoken=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // clone the request adding header and withCredentials
    const token = this.getCsrfToken();
    const headers: Record<string,string> = {};
    console.log(token);
    if (token) {
      headers['X-CSRFToken'] = token;
    }

    const authReq = req.clone({
      withCredentials: true,
      setHeaders: headers
    });
    return next.handle(authReq);
  }
}
