import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category';
import { Skill } from '../models/skill';
import { User } from '../models/User';

@Injectable()
export class ApiService {
  apiUrl = 'http://127.0.0.1:8000/api';
  UrlCategory = 'http://127.0.0.1:8000/api/categories/';
  urlSkills = 'http://127.0.0.1:8000/api/skills/';
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(this.UrlCategory);
  }
  getSkills() {
    return this.http.get<Skill[]>(this.urlSkills);
  }

  getUsers() {
    return this.http.get<User[]>('http://127.0.0.1:8000/api/users/');
  }

  getUsersByFilterCategorie(categoryActive: Category | string) {
    const categoryName = typeof categoryActive === 'string' 
      ? categoryActive 
      : categoryActive.name;
    
    return this.http.get<User[]>(`${this.apiUrl}/users/by-category/${categoryName}`);
  }

  getCountries() {
    return this.http.get<string[]>('http://localhost:8000/api/countries/');
  }
}
