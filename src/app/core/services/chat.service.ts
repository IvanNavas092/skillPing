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
  private baseUrl = 'http://localhost:8000/api/';

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

  /** Inicializa el canal de notificaciones de Pusher para mensajes no leídos */
  initNotificationChannel() {
    const user = this.authService.getCurrentUser();
    if (!user || !user.username) return;

    this.currentChannel = this.pusher.suscribe(`notifications-${user.username}`);
    this.currentChannel.bind('unread-messages', (data: any) => {
      console.log('Mensajes no leídos recibidos:', data);
      if (data.unread_counts !== undefined) {
        this.updateUnreadCounts(data.unread_counts, data.sender);
      }
    });

    this.refreshUnreadCounts();
  }

  /**
   * Actualiza los contadores internos de no leídos.
   * Si se pasa `sender`, refresca también el desglose por remitente desde el backend.
   */
  updateUnreadCounts(total: number, sender?: string) {
    this.unreadCountTotalSubject.next(total);

    if (sender) {
      // refrescar el desglose completo
      const username = this.authService.getCurrentUser().username;
      this.http.post(
        `${this.baseUrl}chat/get-unread-counts/`,
        { username },
        { withCredentials: true }
      ).subscribe({
        next: (resp: any) => {
          const bySender: { [s: string]: number } = {};
          resp.by_sender.forEach((item: any) => {
            bySender[item.sender__username] = item.count;
          });
          this.unreadBySenderSubject.next(bySender);
        },
        error: err => console.error('Error al obtener desglose de no leídos', err)
      });
    }
  }

  /** Obtiene los contadores iniciales de no leídos */
  refreshUnreadCounts(): void {
    const username = this.authService.getCurrentUser().username;
    this.http.post(
      `${this.baseUrl}chat/get-unread-counts/`,
      { username },
      { withCredentials: true }
    ).subscribe({
      next: (resp: any) => {
        this.unreadCountTotalSubject.next(resp.total_unread);
        const bySender: { [s: string]: number } = {};
        resp.by_sender.forEach((item: any) => {
          bySender[item.sender__username] = item.count;
        });
        this.unreadBySenderSubject.next(bySender);
      },
      error: err => console.error('Error al refrescar no leídos', err.error)
    });
  }

  /** Envía un mensaje privado */
  sendPrivateMessage(sender: string, message: string, receptor: string) {
    return this.http.post(
      `${this.baseUrl}chat/send/`,
      { sender, receptor, message },
      { withCredentials: true }
    );
  }

  /** Recupera el historial de chat entre dos usuarios */
  getChatHistory(user1: string, user2: string): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${this.baseUrl}chat-history/`,
      {
        params: { user1, user2 },
        withCredentials: true
      }
    );
  }

  /** Obtiene los contadores de no leídos para un usuario dado */
  getUnreadCounts(username: string) {
    return this.http.post(
      `${this.baseUrl}chat/get-unread-counts/`,
      { username },
      { withCredentials: true }
    );
  }

  /** Marca mensajes como leídos entre currentUser y sender */
  markAsRead(currentUser: string, sender: string) {
    return this.http.post(
      `${this.baseUrl}chat/mark-messages-as-read/`,
      { current_user: currentUser, sender },
      { withCredentials: true }
    );
  }
}
