import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import Pusher from 'pusher-js';
import { ChatService } from 'src/app/core/services/chat.service';
import { Message } from 'src/app/core/models/chat-message';
import { ApiService } from 'src/app/core/services/api.service';
import { User } from 'src/app/core/models/User';
import { AvatarService } from 'src/app/core/services/avatar.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./style.css']
})
export class allComponent implements OnInit {
  
  search = '';
  currentUser = this.authService.getCurrentUser();
  allUsers : User[] = [];
  usersFiltered : User[] = [];
  selectedUser! : User;

  message = ''
  messages : Message[] = [];
  receptor: string = '';
  pusher! : Pusher;

  errorMessage = '';
  constructor(
    private authService: AuthService,
    private chatService: ChatService, 
    private apiService: ApiService,
    private avatarService: AvatarService,
  
  ) { }
  
  ngOnInit(): void {
    this.getUsers();
    this.initializePusher();
    

    // depuration
    console.log('username', this.currentUser.username);
    console.log('message', this.message);
    console.log('messages', this.messages);
  }

  getAvatar(avatarId: number | undefined) {
    return this.avatarService.getAvatarById(avatarId);
  }


  // connect to the chat room
  initializePusher() {
    Pusher.logToConsole = true; // depuration
    this.pusher = new Pusher('682407f9d91aaf86de6f', {
      cluster: 'eu',
      forceTLS: true
    });
  }

  // take the users without the current user
  getUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.allUsers = data.filter((user: User) =>
        user.id !== this.currentUser.id && user.username !== 'admin');
      this.usersFiltered = [...this.allUsers];
    })
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.loadHistory(this.currentUser.username, this.selectedUser.username);

    // unsuscribe all previous channels
    this.pusher.allChannels().forEach(channel => {
      this.pusher.unsubscribe(channel.name);
    });

    // create unique channel for the users
    const channelName = this.getChannelName(this.currentUser.username, user.username);
    // suscribe the channel
    const channel = this.pusher.subscribe(channelName);

    channel.bind('new-message', (data: Message) => {
      this.messages.push({
        sender: data.sender,
        message: data.message,
        timestamp: data.timestamp,
        isMe: data.sender === this.currentUser.username
      });
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
        isMe: msg.sender === this.currentUser.username,
      }));
    })
  }



  // send message to the selected user
  sendMessage() {
    if (!this.message || !this.selectUser) return;

    console.log('attempting to send message')
    console.log(this.currentUser.username);
    console.log(this.selectedUser.username);
    console.log(this.message);
    
    this.chatService.sendPrivateMessage(this.currentUser.username, this.message, this.selectedUser.username)
    .subscribe({
      next: (data) => {
        console.log('message sent');
        this.message = '';
      },
      error: (e) => {
        console.log('error sending message')
        this.errorMessage = e.message;
      }
    })
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
    console.log("USUARIO FILTRADOS" +this.usersFiltered.length);
  }



  onDestroy() {
    if (this.pusher)
      this.pusher.disconnect();
  }
}
