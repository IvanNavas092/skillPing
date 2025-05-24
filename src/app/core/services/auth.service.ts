import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User, UserResponse, UserUpdate } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/api/';
  private storage = sessionStorage;
  // depends on the sessionStorage 
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    !!this.storage.getItem('csrftoken')
  );
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // -----------------------------------
  // AUTENTICACIÓN
  // -----------------------------------

  login(username: string, password: string): Observable<UserResponse> {
    return this.http.post<{
      message: string;
      user: any;
      csrfToken: string;
    }>(
      `${this.baseUrl}login/`,
      { username, password },
    ).pipe(
      tap(res => {
        // 1) obtain user data and save it in sessionStorage
        sessionStorage.setItem('auth-user', JSON.stringify(res.user));
        this.isLoggedInSubject.next(true);
        // 2) save the token csrf
        sessionStorage.setItem('csrfToken', res.csrfToken);
      }),
      // return only the user
      map(res => ({ user: res.user, message: res.message } as UserResponse))
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}logout/`,
      {},
    ).pipe(
      tap(() => {
        this.storage.clear();
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/login']);
      })
    );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}users/`,
      user,
    );
  }

  // -----------------------------------
  // SESIÓN / USUARIO
  // -----------------------------------

  /** Comprueba si la sesión sigue viva y almacena el usuario */  /** Llama al endpoint y actualiza el estado loggedInSubject */
  checkSession(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}current-user/`).pipe(
      tap(user => {
        this.storage.setItem('auth-user', JSON.stringify(user));
        this.isLoggedInSubject.next(true);
      }),
      catchError(err => {
        // Si da error, dejamos el estado en false
        this.storage.removeItem('auth-user');
        this.isLoggedInSubject.next(false);
        console.log('Debes inciar sesión');
        return throwError(() => err);
      })
    );
  }

  // return the user object stored (or {} if no one)
  getCurrentUser(): User {
    const user = this.storage.getItem('auth-user');
    return user ? JSON.parse(user) : {} as User;
  }

  // return only the user id (useful for building urls)
  getCurrentUserId(): number {
    return this.getCurrentUser().id || 0;
  }

  // obtain any user by id
  fetchUserById(id: number): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}get-user/${id}/`
    );
  }

  // obtain user ratings
  fetchUserRatings(id: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}user-ratings/${id}/`
    );
  }

  // -----------------------------------
  // profile
  // -----------------------------------

  updateUser(id: number, payload: UserUpdate): Observable<User> {
    return this.http.patch<User>(
      `${this.baseUrl}update-user/${id}/`, payload
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}change-password/`,
      {
        old_password: oldPassword,
        new_password: newPassword
      })
      .pipe(
        tap(() => {
          this.storage.clear();
          this.isLoggedInSubject.next(false);
          this.router.navigate(['/login']);
        })
      )
  }
}
