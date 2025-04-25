import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import Pusher from 'pusher-js';
import { ChatService } from 'src/app/core/services/chat.service';
import { message } from 'src/app/core/models/chat-message';
import { ApiService } from 'src/app/core/services/api.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
})
export class allComponent implements OnInit {

  currentUser = this.authService.getCurrentUser();

  users : User[] = [];
  selectedUser! : User;

  message = ''
  messages : message[] = [];
  receptor: string = '';
  pusher! : Pusher;

  isSending = false;
  errorMessage = '';
  constructor(private authService: AuthService, private chatService: ChatService, private apiService: ApiService) { }
  
  ngOnInit(): void {
    this.getUsers();
    this.initializePusher();

    // depuration
    console.log('username', this.currentUser.username);
    console.log('message', this.message);
    console.log('messages', this.messages);
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
      this.users = data.filter((user: any) =>
        user.id !== this.currentUser.id && user.username !== 'admin');
    })
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.messages = [];

    // unsuscribe all previous channels
    this.pusher.allChannels().forEach(channel => {
      this.pusher.unsubscribe(channel.name);
    });

    // create unique channel for the users
    const channelName = this.getChannelName(this.currentUser.username, user.username);
    // suscribe the channel
    const channel = this.pusher.subscribe(channelName);

    channel.bind('new-message', (data: message) => {
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



  // sendMessage
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
        this.isSending = false;
        
      },
      error: (e) => {
        console.log('error sending message')
        this.errorMessage = e.message;
        this.isSending = false;
      }
    })
  }



  onDestroy() {
    if (this.pusher)
      this.pusher.disconnect();
  }
}
