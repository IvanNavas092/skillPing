import {
  Component,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { PusherService } from 'src/app/core/services/pusher.service';
import { AvatarService } from 'src/app/core/services/avatar.service';
import Pusher from 'pusher-js';
import { User } from 'src/app/core/models/User';
import { Message } from 'src/app/core/models/chat-message';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, OnDestroy {
  // estado compartido
  search = '';
  allUsers: User[] = [];
  usersFiltered: User[] = [];
  selectedUser: User | null = null;
  messages: Message[] = [];
  unreadBySender: { [key: string]: number } = {};
  currentUser = this.authService.getCurrentUser();
  pusher!: Pusher;
  isMobile = window.innerWidth <= 1024;
  userSelectedFromButton!: User | undefined;


  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private chatService: ChatService,
    private pusherService: PusherService,
    private avatarService: AvatarService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUsers();
    // suscripción a recuentos no leídos
    this.chatService.unReadBySender$.subscribe(data => {
      this.unreadBySender = data;
    });
    this.chatService.refreshUnreadCounts();

  }

  ngOnDestroy() {
    if (this.pusher) this.pusher.disconnect();
  }

  // obtiene y filtra usuarios
  getUsers() {
    this.apiService.getUsers().subscribe(data => {
      this.allUsers = data.filter(u =>
        u.id !== this.currentUser.id &&
        u.username !== 'admin'
      );
      // obtiene por url el id del usuario
      const paramId = this.activatedRoute.snapshot.paramMap.get('id');
      if (paramId !== null) {
        this.userSelectedFromButton = this.allUsers.find(u => u.id === Number(paramId));
        console.log(this.userSelectedFromButton);
        console.log(this.allUsers);
        if (this.userSelectedFromButton) {
          this.onUserSelected(this.userSelectedFromButton);
          console.log(this.userSelectedFromButton);
        }
      }
      this.usersFiltered = [...this.allUsers];
      this.setupPusherListener();
    });
  }

  // Search desde el sidebar
  onSearch(term: string) {
    this.search = term;
    const q = term.toLowerCase().trim();
    this.usersFiltered = q
      ? this.allUsers.filter(u =>
        u.username.toLowerCase().includes(q)
      )
      : [...this.allUsers];
  }

  // Cuando seleccionan un usuario
  onUserSelected(user: User) {
    this.selectedUser = user;
    // marcar leído y cargar historial
    this.chatService
      .markAsRead(this.currentUser.username, user.username)
      .subscribe(() => {
        this.loadHistory(this.currentUser.username, user.username);
        this.chatService.refreshUnreadCounts();
      });
  }

  // recibe el mensaje del ChatWindow y lo envía
  onSendMessage(text: string) {
    if (!text || !this.selectedUser) return;
    this.chatService
      .sendPrivateMessage(
        this.currentUser.username,
        text,
        this.selectedUser.username
      )
      .subscribe(() => {
        // auto-insertar en la vista
        this.messages = [
          ...this.messages,
          {
            sender: this.currentUser.username,
            message: text,
            timestamp: new Date().toISOString(),
            isMe: true
          }
        ];
      });
  }

  // carga el historial y lo marca con isMe
  loadHistory(u1: string, u2: string) {
    this.chatService.getChatHistory(u1, u2)
      .subscribe((data: Message[]) => {
        this.messages = data.map(msg => ({
          ...msg,
          isMe: msg.sender === this.currentUser.username
        }));
      });
  }

  // websocket listeners
  setupPusherListener() {
    // notificaciones globales
    const noticeCh = this.pusherService.suscribe(
      `notifications-${this.currentUser.username}`
    );
    noticeCh.bind('unread-messages', () =>
      this.chatService.refreshUnreadCounts()
    );

    // mensajes privados
    this.allUsers.forEach(u => {
      const ch = this.pusherService.suscribe(
        this.getChannelName(this.currentUser.username, u.username)
      );
      ch.bind('new-message', (data: Message) => {
        // si estás conversando con quien envía, actualiza
        if (this.selectedUser?.username === data.sender) {
          this.messages = [
            ...this.messages,
            {
              ...data,
              isMe: false
            }
          ];
        }
        this.chatService.refreshUnreadCounts();
      });
    });
  }

  // helper para canal
  getChannelName(a: string, b: string) {
    return `room-chat-${[a, b].sort().join('_')}`;
  }

  // helper avatar
  getAvatar(id: number | undefined) {
    return this.avatarService.getAvatarById(id);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 768;
  }
}
