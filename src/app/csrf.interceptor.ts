// src/app/interceptors/csrf.interceptor.ts
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
  // Extrae el valor de la cookie csrftoken
  private getCsrfToken(): string | null {
    const match = document.cookie.match(/(?:^|; )csrftoken=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clona la petición añadiendo header y withCredentials
    const token = this.getCsrfToken();
    const headers: Record<string,string> = {};

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
