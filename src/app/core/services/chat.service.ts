// src/app/services/chat.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PusherService } from './pusher.service';
import { Message } from '../models/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // base API URL
  private baseUrl = '/api/';

  // reactive state
  private unreadCountTotalSubject = new BehaviorSubject<number>(0);
  private unreadBySenderSubject = new BehaviorSubject<{ [sender: string]: number }>({});

  unReadCountTotal$ = this.unreadCountTotalSubject.asObservable();
  unReadBySender$ = this.unreadBySenderSubject.asObservable();
  currentChannel: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private pusher: PusherService,
  ) {
    this.initNotificationChannel();
  }

  /** init pusher notification channel for unread messages */
  initNotificationChannel() {
    const user = this.authService.getCurrentUser();
    if (!user || !user.username) return;

    this.currentChannel = this.pusher.subscribe(`notifications-${user.username}`);
    this.currentChannel.bind('unread-messages', (data: any) => {
      console.log('Mensajes no leídos recibidos:', data);
      if (data.unread_counts !== undefined) {
        this.updateUnreadCounts(data.unread_counts, data.sender);
      }
    });

    this.refreshUnreadCounts();
  }

  /**
   * update behaviour subjects with new unread counts.
   * If `sender`, it will also refresh the unread counts for that sender.
   */
  updateUnreadCounts(total: number, sender?: string) {
    this.unreadCountTotalSubject.next(total);

    if (sender) {
      // obtain the current user
      const username = this.authService.getCurrentUser().username;
      // obtain the sender's unread counts
      /* response of endpoint:
      [
        { "sender__username": "ana", "count": 3 },
        { "sender__username": "hector", "count": 1 }
      ]
        */

      this.http.post(
        `${this.baseUrl}chat/get-unread-counts/`,
        { username },
      ).subscribe({
        next: (resp: any) => {
          const bySender: { [s: string]: number } = {};
          resp.by_sender.forEach((item: any) => {
            bySender[item.sender__username] = item.count;
          });
          this.unreadBySenderSubject.next(bySender);
          /* save this in behavior subject:
          {
            "ana": 3,
            "hector": 1
          }
          */
        },
        error: err => console.error('Error al obtener desglose de no leídos', err)
      });
    }
  }

  /** refresh unread counts */
  refreshUnreadCounts(): void {
    // obtain current user > username
    const username = this.authService.getCurrentUser().username;
    this.http.post(
      `${this.baseUrl}chat/get-unread-counts/`,
      { username },
    ).subscribe({
      next: (resp: any) => {
        // save the total unread count
        this.unreadCountTotalSubject.next(resp.total_unread);
        // save the unread count by sender again for refresh
        const bySender: { [s: string]: number } = {};
        resp.by_sender.forEach((item: any) => {
          bySender[item.sender__username] = item.count;
        });
        this.unreadBySenderSubject.next(bySender);
      },
      error: err => console.error('Error al refrescar no leídos', err.error)
    });
  }

  /** send private message */
  sendPrivateMessage(sender: string, message: string, receptor: string) {
    return this.http.post(
      `${this.baseUrl}chat/send/`,
      { sender, receptor, message }
    );
  }

  /** obtain chat history between two users */
  getChatHistory(user1: string, user2: string): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${this.baseUrl}chat-history/`,
      {
        params: { user1, user2 },
      }
    );
  }

  /** mark messages as read between currentUser and sender */
  markAsRead(currentUser: string, sender: string) {
    return this.http.post(
      `${this.baseUrl}chat/mark-messages-as-read/`,
      { current_user: currentUser, sender },
    );
  }
}
