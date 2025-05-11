import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category';
import { Skill } from '../models/skill';
import { User } from '../models/User';
import { Rating, RatingPayload } from '../models/rating';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  apiUrl = 'http://127.0.0.1:8000/api';
  UrlCategory = 'http://127.0.0.1:8000/api/categories';
  urlSkills = 'http://127.0.0.1:8000/api/skills';
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(this.UrlCategory);
  }
  getSkills() {
    return this.http.get<Skill[]>(this.urlSkills);
  }

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users/`);
  }

  getUsersByFilterCategorie(categoryActive: string) {
    return this.http.get<User[]>(`${this.apiUrl}/users/by-category/${categoryActive}`);
  }

  getCountries() {
    return this.http.get<string[]>(`${this.apiUrl}/countries/`);
  }

  getRatingsByUser(id: number) {
    return this.http.get<Rating[]>(`${this.apiUrl}/ratings/${id}`);
  }

  setRating(rating: RatingPayload): Observable<RatingPayload> {
    const dataRating = {
      rating_user: rating.rating_user, // user who rated
      rated_user: rating.rated_user, // user who is rated
      comment: rating.comment, // comment
      value: rating.value, // value
    }

    return this.http.post<RatingPayload>(`${this.apiUrl}/ratings/`,  dataRating); 
  }
} 
