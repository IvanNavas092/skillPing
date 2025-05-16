import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserResponse, UserUpdate } from '../models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  // url api
  apiUrl = 'http://localhost:8000/api/';



  private storage = sessionStorage;
  isLoggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());

  loggedIn$ = this.isLoggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // REGISTER
  register(user: User): Observable<User> {
    const registrationData = {
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      password: user.password,
      skills: user.skills,
      interests: user.interests,
      // extras
      avatar: user.avatar,
      description: user.description,
      age: user.age,
      location: user.location,
      gender: user.gender,
    }
    return this.http.post<User>(this.apiUrl + 'users/', registrationData);
  }


  // LOGIN
  login(username: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiUrl + 'login/', { username, password }).pipe(
      tap(response => { // Tap para que no modifique el response
        this.storeAuthData(response);
        this.isLoggedIn.next(true);
      })
    );
  }

  // update user
  updateUser(id: number, user: UserUpdate): Observable<User> {
    const updateData = {
      avatar: user.avatar,
      full_name: user?.full_name,
      username: user.username,
      email: user.email,
      age: user.age,
      location: user.location,
      gender: user.gender,
      description: user.description,
      skills: user.skills,
      interests: user.interests,
    }
    return this.http.patch<User>(this.apiUrl + 'users/update-user/' + id + '/', updateData);
  }

  changePassword(old_password: string, new_password: string): Observable<any> {
    const body = {
      old_password,
      new_password
    };

    console.log(body);
    return this.http.put(`${this.apiUrl}change-password/`, body);
  }


  storeAuthData(data: UserResponse) {
    // datos de views.py django
    // Quiero que guarde en sessionStorage los datos del user que se ha logueado
    this.storage.setItem('auth-token', data.access_token)
    this.storage.setItem('auth-user', JSON.stringify(data.user));
  }

  logout() {
    this.storage.removeItem('auth-token');
    this.storage.removeItem('auth-user');
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.storage.getItem('auth-token');
  }

  // get current user OBJECT
  getCurrentUser() {
    const user = this.storage.getItem('auth-user');
    return user ? JSON.parse(user) : null;
  }

  // get current user ID
  getCurrentUserId() {
    const user = this.storage.getItem('auth-user');
    return user ? JSON.parse(user).id : null;
  }


  getToken() {
    return this.storage.getItem('auth-token');
  }


  getUserById(id: string): Observable<User> {
    const idNumber = parseInt(id, 10);
    return this.http.get<User>(this.apiUrl + 'users/' + idNumber);
  }



}
