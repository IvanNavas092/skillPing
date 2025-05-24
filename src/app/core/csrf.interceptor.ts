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

  private getCsrfToken(): string | null {
    const match = document.cookie.match(/(?:^|; )csrftoken=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getCsrfToken();
    console.log('token', token);
    if (token) {
      console.log('token', token);
      // Clonar petición y añadir header + withCredentials
      const authReq = req.clone({
        withCredentials: true,
        setHeaders: {
          'X-CSRFToken': token
        }
      });
      return next.handle(authReq);
    }

    // Si no hay token, al menos aseguramos enviar cookies
    const reqWithoutToken = req.clone({
      withCredentials: true
    });

    return next.handle(reqWithoutToken);
  }
}
