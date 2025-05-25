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
  // pusher
  pusher!: Pusher;
  // search
  search = '';
  // users
  allUsers: User[] = [];
  usersFiltered: User[] = [];
  selectedUser: User | null = null;
  currentUser = this.authService.getCurrentUser();
  userSelectedFromButton!: User | undefined;
  // messages
  messages: Message[] = [];
  unreadBySender: { [key: string]: number } = {};
  // mobile
  isMobile = window.innerWidth <= 1024;


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
    // subscription to unread counts
    this.chatService.unReadBySender$.subscribe(data => {
      this.unreadBySender = data;
    });
    this.chatService.refreshUnreadCounts();

  }

  ngOnDestroy() {
    if (this.pusher) this.pusher.disconnect();
  }

  // get users an filter
  getUsers() {
    this.apiService.getUsers().subscribe(data => {
      this.allUsers = data.filter(u =>
        u.id !== this.currentUser.id &&
        u.username !== 'admin'
      );
      // otain by url the id of user
      const paramId = this.activatedRoute.snapshot.paramMap.get('id');
      if (paramId !== null) {
        // find user by id
        this.userSelectedFromButton = this.allUsers.find(u => u.id === Number(paramId));
        if (this.userSelectedFromButton) {
          // if user is selected, select it
          this.onUserSelected(this.userSelectedFromButton);
        }
      }
      this.usersFiltered = [...this.allUsers];
      this.setupPusherListener();
    });
  }

  // search from sidebar
  onSearch(term: string) {
    this.search = term;
    const query = term.toLowerCase().trim();
    this.usersFiltered = query
      ? this.allUsers.filter(u =>
        u.username.toLowerCase().includes(query)
      )
      : [...this.allUsers];
  }

  // when selecting a user
  onUserSelected(user: User) {
    this.selectedUser = user;
    // mark read and load history
    this.chatService
      .markAsRead(this.currentUser.username, user.username)
      .subscribe(() => {
        this.loadHistory(this.currentUser.username, user.username);
        this.chatService.refreshUnreadCounts();
      });
  }

  // receives message from ChatWindow and sends it
  onSendMessage(text: string) {
    if (!text || !this.selectedUser) return;
    // send message
    this.chatService
      .sendPrivateMessage(
        this.currentUser.username,
        text,
        this.selectedUser.username
      )
      .subscribe(() => {
        // auto-insert in view (for ngOnchanges)
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

  // load history and mark with isRead = isMe
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
    const noticeCh = this.pusherService.subscribe(
      `notifications-${this.currentUser.username}`
    );
    noticeCh.bind('unread-messages', () =>
      this.chatService.refreshUnreadCounts()
    );

    // messages between users
    this.allUsers.forEach(u => {
      const ch = this.pusherService.subscribe(
        this.getChannelName(this.currentUser.username, u.username)
      );
      ch.bind('new-message', (data: Message) => {
        // if you are talking with who sends (sender), update
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

  // helper for channel name
  getChannelName(a: string, b: string) {
    return `room-chat-${[a, b].sort().join('_')}`;
  }

  // helper avatar
  getAvatar(id: number | undefined) {
    return this.avatarService.getAvatarById(id);
  }

  // resize listener
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 768;
  }
}
