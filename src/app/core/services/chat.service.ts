import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url = 'http://localhost:8000/api/chat'

  constructor(private http: HttpClient) { }

  sendPrivateMessage(sender: string, message: string, receptor: string): Observable<any> {
    return this.http.post(`${this.url}/send`, {
      sender, message, receptor
    });
  }

  getChatHistory(user1: string, user2: string): Observable<any> {
    return this.http.get(`${this.url}/history`, {
      params: { user1, user2 }
    });
  }
}
