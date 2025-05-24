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
  private getStoredCsrf(): string {
    return sessionStorage.getItem('csrfToken') || '';
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.getStoredCsrf();

    // Siempre enviamos las cookies de sesión
    let cloneConfig: {
      withCredentials: boolean;
      setHeaders?: { [name: string]: string };
    } = {
      withCredentials: true
    };

    // En mutaciones añadimos también el header CSRF
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      cloneConfig = {
        withCredentials: true,
        setHeaders: {
          'X-CSRFToken': token,
          // si quieres, también fuerza Content-Type
          'Content-Type': 'application/json'
        }
      };
    }

    const clonedReq = req.clone(cloneConfig);
    return next.handle(clonedReq);
  }
}
