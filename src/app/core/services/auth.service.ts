import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User, UserResponse, UserUpdate } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/';
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
  // AUTENTICACIÓN
  // -----------------------------------

  login(username: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${this.baseUrl}login/`,
      { username, password },
      { withCredentials: true }
    ).pipe(
      tap(res => {
        this.storeAuthData(res);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}logout/`,
      {},
      { withCredentials: true }
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
      { withCredentials: true }
    );
  }

  // -----------------------------------
  // SESIÓN / USUARIO
  // -----------------------------------

  /** Comprueba si la sesión sigue viva y almacena el usuario */  /** Llama al endpoint y actualiza el estado loggedInSubject */
  checkSession(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}current-user/`, { withCredentials: true }).pipe(
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

  /** Devuelve el objeto User almacenado (o {} si no hay) */
  getCurrentUser(): User {
    const user = this.storage.getItem('auth-user');
    return user ? JSON.parse(user) : {} as User;
  }

  /** Devuelve solo el ID (útil para construir URLs) */
  getCurrentUserId(): number {
    return this.getCurrentUser().id || 0;
  }

  /** Obtener cualquier usuario por su ID */
  fetchUserById(id: number): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}get-user/${id}/`,
      { withCredentials: true }
    );
  }

  /** Obtener valoraciones de un usuario */
  fetchUserRatings(id: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}user-ratings/${id}/`,
      { withCredentials: true }
    );
  }

  // -----------------------------------
  // PERFIL
  // -----------------------------------

  updateUser(id: number, payload: UserUpdate): Observable<User> {
    return this.http.patch<User>(
      `${this.baseUrl}update-user/${id}/`,
      payload,
      { withCredentials: true }
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}change-password/`,
      {
        old_password: oldPassword,
        new_password: newPassword
      },
      { withCredentials: true }
    );
  }

  private storeAuthData(res: UserResponse) {
    this.storage.setItem('auth-user', JSON.stringify(res.user));
  }
}
