import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserResponse } from '../models/User';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  // register
  registerUrl = 'http://localhost:8000/api/users/'


  // login
  loginUrl = 'http://localhost:8000/api/login/';
  private tokenKey = 'auth-token';
  private userKey = 'auth-user';
  private storage = sessionStorage;

  constructor(private http: HttpClient, private router: Router) { }

  // REGISTER
  register(user: User): Observable<User> {
    const registrationData = {
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      password: user.password,
      skills: user.skills, // ID
      interests: user.interests // ID
    }
    return this.http.post<User>(this.registerUrl, registrationData);

  }


  // LOGIN
  login(username: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.loginUrl, { username, password }).pipe(
      tap(response => { // Tap para que no modifique el response
        this.storeAuthData(response);
      })
    );

  }

  storeAuthData(data: UserResponse) {
    // datos de views.py django
    // Quiero que guarde en sessionStorage los datos del user que se ha logueado
    this.storage.setItem(this.tokenKey, data.access_token)
    this.storage.setItem(this.userKey, JSON.stringify(data.user));
  }

  logout() {
    this.storage.removeItem(this.tokenKey);
    this.storage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.storage.getItem(this.tokenKey);
  }

  getCurrentUser() {
    const user = this.storage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  getToken() {
    return this.storage.getItem(this.tokenKey);
  }

}
