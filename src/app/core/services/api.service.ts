import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category';
import { Skill } from '../models/skill';
import { User } from '../models/User';
import { Rating, RatingPayload } from '../models/rating';
import { Observable } from 'rxjs';
import { Country } from '../models/Country';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = '/api/';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    // /categories/
    return this.http.get<Category[]>(
      `${this.apiUrl}categories/`
    );
  }

  getSkills(): Observable<Skill[]> {
    // /skills/
    return this.http.get<Skill[]>(
      `${this.apiUrl}skills/`
    );
  }

  getUsers(): Observable<User[]> {
    // /users/
    return this.http.get<User[]>(
      `${this.apiUrl}users/`
    );
  }

  getUsersByFilterCategorie(categoryActive: string | null): Observable<User[]> {
    // /users-by-category/{categoryActive}/
    return this.http.get<User[]>(
      `${this.apiUrl}users-by-category/${categoryActive}/`
    );
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.apiUrl}get-countries/`
    );
  }

  getRatingsByUser(id: number): Observable<Rating[]> {
    // /user-ratings/{id}/
    return this.http.get<Rating[]>(
      `${this.apiUrl}user-ratings/${id}/`
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
    );
  }
}
