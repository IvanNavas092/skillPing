import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { PusherService } from './pusher.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url = 'http://localhost:8000/api/chat'

  // behaviour subjects reactives states
  private unreadCountTotalSubject = new BehaviorSubject<number>(0);
  private unreadBySenderSubject = new BehaviorSubject<{ [sender: string]: number }>({}); // "juan": 3, "pedro": 1

  // observables
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


  // init notification channel pusher
  initNotificationChannel() {
    // if not current user return
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    // Suscribir al nuevo canal
    this.currentChannel = this.pusher.suscribe(`notifications-${currentUser.username}`);

    // suscribe to channel notifications and listen unread messages event and return data
    this.currentChannel.bind('unread-messages', (data: any) => {
      console.log('Mensajes no leídos', data);
      // if new messages arrive, update the counters with the new data
      if (data.unread_counts !== undefined) {
        this.updateUnreadCounts(data.unread_counts, data.sender);
      }
    });
    // force refresh unread counts
    this.refreshUnreadCounts();
  }
  updateUnreadCounts(total: number, sender?: string) {
    // update the total counter
    this.unreadCountTotalSubject.next(total);
    const currentUser = this.authService.getCurrentUser();

    // actualizar contador por usuario
    if (sender) {
      const current = this.unreadBySenderSubject.value;
      console.log('CONTADOR POR USUARIO', current);

      // http post request to get unread counts for the current user
      this.http.post(`${this.url}/get-unread-counts`, {
        username: currentUser.username
      }).subscribe({
        next: (data: any) => {
          const bySender: { [sender: string]: number } = {};
          data.by_sender.forEach((item: any) => {
            // convert in this format: { username: unreadCount } -> { juan: 3}
            bySender[item.sender__username] = item.count;
          });
          // and update the subject with the new data
          this.unreadBySenderSubject.next(bySender);
        },
        error: (err) => console.error('Error fetching unread counts', err)
      })
      // update the counter of the current user -> (juan: 4)
      current[sender] = total;
      this.unreadBySenderSubject.next(current);
    }

  }

  // obtain initial counters from backend and refresh the observables
  refreshUnreadCounts(): void {
    const currentUser = this.authService.getCurrentUser();
    this.http.post(`${this.url}/get-unread-counts`, { username: currentUser.username })
      .subscribe({
        next: (data: any) => {
          // 1. update total
          this.unreadCountTotalSubject.next(data.total_unread);
          // 2. Actualizar por remitente
          const bySender: { [sender: string]: number } = {};
          data.by_sender.forEach((item: any) => {
            // convert again in this format: { juan: 3 } -> { username: unreadCount } -> { username: 3 }
            bySender[item.sender__username] = item.count;
          });
          // save the username and count of sender
          this.unreadBySenderSubject.next(bySender);
          console.log('bySender', bySender);
        },
        error: (err) => console.error('Error fetching unread counts', err)
      });
  }


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

  // obtain no read messages counters
  getUnreadCounts(username: string): Observable<any> {
    return this.http.post(`${this.url}/get-unread-counts`, { username });
  }

  // mark messages as read
  markAsRead(currentUser: string, sender: string): Observable<any> {
    return this.http.post(`${this.url}/mark-messages-as-read`, {
      current_user: currentUser,
      sender: sender
    });

  }

}
