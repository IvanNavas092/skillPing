import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category';
import { Skill } from '../models/skill';
import { User } from '../models/User';
import { Rating, RatingPayload } from '../models/rating';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = '/api/';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    // /categories/
    return this.http.get<Category[]>(
      `${this.apiUrl}categories/`,
      { withCredentials: true }
    );
  }

  getSkills(): Observable<Skill[]> {
    // /skills/
    return this.http.get<Skill[]>(
      `${this.apiUrl}skills/`,
      { withCredentials: true }
    );
  }

  getUsers(): Observable<User[]> {
    // /users/
    return this.http.get<User[]>(
      `${this.apiUrl}users/`,
      { withCredentials: true }
    );
  }

  getUsersByFilterCategorie(categoryActive: string | null): Observable<User[]> {
    // /users-by-category/{categoryActive}/
    return this.http.get<User[]>(
      `${this.apiUrl}users-by-category/${categoryActive}/`,
      { withCredentials: true }
    );
  }

  getCountries(): Observable<string[]> {
    // /get-countries/
    return this.http.get<string[]>(
      `${this.apiUrl}get-countries/`,
      { withCredentials: true }
    );
  }

  getRatingsByUser(id: number): Observable<Rating[]> {
    // /user-ratings/{id}/
    return this.http.get<Rating[]>(
      `${this.apiUrl}user-ratings/${id}/`,
      { withCredentials: true }
    );
  }

  setRating(rating: RatingPayload): Observable<RatingPayload> {
    // POST /ratings/
    const dataRating = {
      rating_user: rating.rating_user,
      rated_user: rating.rated_user,
      comment: rating.comment,
      value: rating.value,
    };
    return this.http.post<RatingPayload>(
      `${this.apiUrl}ratings/`,
      dataRating,
      { withCredentials: true }
    );
  }
}
