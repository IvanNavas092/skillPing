// csrf.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  constructor(private AuthService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = this.AuthService.getToken();

    if (csrfToken) {
      console.log('token', csrfToken);
      const cloned = req.clone({
        setHeaders: {
          'X-CSRFToken': csrfToken
        },
        withCredentials: true
      });
      return next.handle(cloned);
    } else {
      // Aún no tienes el token, pero aún así necesitas withCredentials
      const fallback = req.clone({ withCredentials: true });
      return next.handle(fallback);
    }
  }
}
