import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category';
import { Skill } from '../models/skill';

@Injectable()
export class ApiService {
   UrlCategory = 'http://127.0.0.1:8000/api/categories/';
   urlSkills = 'http://127.0.0.1:8000/api/skills/';
   constructor(private http: HttpClient) { }

   getCategories() {
      return this.http.get<Category[]>(this.UrlCategory);
   }
   getSkills() {
      return this.http.get<Skill[]>(this.urlSkills);
   }

}
