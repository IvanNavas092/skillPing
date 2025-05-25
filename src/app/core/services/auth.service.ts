import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User, UserResponse, UserUpdate } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/';
  private storage = sessionStorage;
  // depends on the sessionStorage 
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    !!this.storage.getItem('auth-user')
  );
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // -----------------------------------
  // autentication
  // -----------------------------------

  login(username: string, password: string): Observable<UserResponse> {
    return this.http.post<{
      message: string;
      user: any;
      csrfToken: string;
    }>(
      `${this.apiUrl}login/`,
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
      `${this.apiUrl}logout/`,
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
      `${this.apiUrl}users/`,
      user,
    );
  }

  // -----------------------------------
  // session / user
  // -----------------------------------

  /** comprobe if session is alive and store user */ 
  checkSession(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}current-user/`).pipe(
      tap(user => {
        this.storage.setItem('auth-user', JSON.stringify(user));
        this.isLoggedInSubject.next(true);
      }),
      catchError(err => {
        // if error, leave state as false
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
      `${this.apiUrl}get-user/${id}/`
    );
  }

  // obtain user ratings
  fetchUserRatings(id: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}user-ratings/${id}/`
    );
  }

  // -----------------------------------
  // profile
  // -----------------------------------

  updateUser(id: number, payload: UserUpdate): Observable<User> {
    return this.http.patch<User>(
      `${this.apiUrl}update-user/${id}/`, payload
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}change-password/`,
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
