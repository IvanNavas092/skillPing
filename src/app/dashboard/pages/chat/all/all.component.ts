import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import Pusher from 'pusher-js';
import { ChatService } from 'src/app/core/services/chat.service';
import { Message } from 'src/app/core/models/chat-message';
import { ApiService } from 'src/app/core/services/api.service';
import { User } from 'src/app/core/models/User';
import { AvatarService } from 'src/app/core/services/avatar.service';
import { PusherService } from 'src/app/core/services/pusher.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./style.css']
})
export class allComponent implements OnInit, OnDestroy, AfterViewChecked {
  // scroll
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  shouldScroll = false;
  // 
  search = '';
  currentUser = this.authService.getCurrentUser();
  allUsers: User[] = [];
  usersFiltered: User[] = [];
  selectedUser!: User;

  message = ''
  messages: Message[] = [];
  receptor: string = '';
  pusher!: Pusher;

  errorMessage = '';

  // notifications
  unreadBySender: { [key: string]: number } = {};

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private apiService: ApiService,
    private avatarService: AvatarService,
    private pusherService: PusherService,

  ) { }

  ngOnInit(): void {
    this.getUsers();

    this.chatService.unReadBySender$.subscribe((data) => {
      this.unreadBySender = data;
    });

    // force refresh unread counts
    this.chatService.refreshUnreadCounts();

    // depuration
    // --------------------------------------
    // console.log('username', this.currentUser.username);
    // console.log('message', this.message);
    // console.log('messages', this.messages);
    // --------------------------------------
  }

  // execute for each change view (when you select user)
  ngAfterViewChecked() {
    // timeout for the messages loading, first load messages and then scroll to bottom
    if (this.shouldScroll) {
      setTimeout(() => {
        this.scrollToBottom();
        this.shouldScroll = false;
      }, 100);
    }
  }
  // scroll to bottom
  scrollToBottom(): void {
    try {
      const container = this.messagesContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        
      });
    } catch (err) {
      console.error(err);
    }
  }

  // take the users without the current user
  getUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.allUsers = data.filter((user: User) =>
        user.id !== this.currentUser.id && user.username !== 'admin');
      this.usersFiltered = [...this.allUsers];
      this.setupPusherListener();
    })

  }

  selectUser(user: User) {
    this.selectedUser = user;

    // when select a user, mark as read and load history
    this.chatService.markAsRead(this.currentUser.username, this.selectedUser.username)
      .subscribe({
        next: () => {
          this.loadHistory(this.currentUser.username, this.selectedUser.username);
          this.chatService.refreshUnreadCounts();
          this.shouldScroll = true;
        },
        error: (err) => console.error('Error marking as read', err)
      });
  }


  // method for sort the usernames for ids rooms
  getChannelName(user1: string, user2: string): string {
    const users = [user1, user2].sort();
    return `room-chat-${users[0]}_${users[1]}`;
  }

  loadHistory(user1: string, user2: string) {
    this.chatService.getChatHistory(user1, user2).subscribe((data: Message[]) => {
      this.messages = data.map(msg => ({
        ...msg,
        // true if sender = current user
        isMe: msg.sender === this.currentUser.username,
      }));
    })
  }



  // send message to the selected user
  sendMessage() {
    if (!this.message || !this.selectedUser) return;

    console.log('attempting to send message')
    console.log(this.currentUser.username);
    console.log(this.selectedUser.username);
    console.log(this.message);

    this.chatService.sendPrivateMessage(this.currentUser.username, this.message, this.selectedUser.username)
      .subscribe({
        next: (data) => {
          console.log('message sent');

          // Añadir el mensaje a la vista local inmediatamente
          this.messages.push({
            sender: this.currentUser.username,
            message: this.message,
            timestamp: new Date().toISOString(),
            isMe: true
          });

          this.message = '';
        },
        error: (e) => {
          console.log('error sending message')
          this.errorMessage = e.message;
        }
      });
  }

  onSearch(value: string) {
    this.search = value.toLowerCase().trim();

    if (!this.search) {
      this.usersFiltered = [...this.allUsers];
    }
    else {
      this.usersFiltered = this.allUsers.filter(user =>
        user.username.toLowerCase().includes(value.toLowerCase()));
      console.log(this.usersFiltered);
      console.log(this.search);
    }
    // depuration
    console.log("USUARIO TODOS" + this.allUsers.length);
    console.log("USUARIO FILTRADOS" + this.usersFiltered.length);
  }

  // get unread count for a user
  getUnreadCountForUser(username: string): number {
    return this.unreadBySender[username] || 0;
  }

  setupPusherListener() {
    // Escuchar el canal de notificaciones para actualizaciones generales
    const notificationChannel = this.pusherService.suscribe(
      `notifications-${this.currentUser.username}`
    );

    notificationChannel.bind('unread-messages', (data: any) => {
      this.chatService.refreshUnreadCounts();
    });

    // Escuchar mensajes entrantes para todos los usuarios
    this.allUsers.forEach(user => {
      if (user.username !== this.currentUser.username) {
        const channelName = this.getChannelName(this.currentUser.username, user.username);
        const channel = this.pusherService.suscribe(channelName);
        console.log('Subscribing to channel', channelName);

        channel.bind('new-message', (data: Message) => {
          // Si estamos en el chat con este usuario, añadir el mensaje
          if (this.selectedUser?.username === data.sender) {
            this.messages.push({
              sender: data.sender,
              message: data.message,
              timestamp: data.timestamp,
              isMe: false
            });
          }
          // Actualizar contadores
          this.chatService.refreshUnreadCounts();
        });
      }
    });
  }


  getAvatar(avatarId: number | undefined) {
    return this.avatarService.getAvatarById(avatarId);
  }





  ngOnDestroy() {
    if (this.pusher)
      this.pusher.disconnect();
  }
}
