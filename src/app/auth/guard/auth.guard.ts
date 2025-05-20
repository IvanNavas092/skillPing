import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.checkSession().pipe(
      map(user => {
        // session is valid, let's go
        return true;
      }),
      catchError(err => {
        // sesion is not valid or expired → redirect
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
