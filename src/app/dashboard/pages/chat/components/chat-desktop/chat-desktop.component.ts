import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { Message } from 'src/app/core/models/chat-message';

@Component({
  selector: 'app-chat-desktop',
  templateUrl: './chat-desktop.component.html',
})
export class ChatDesktopComponent {
  @Input() users: User[] = [];
  @Input() unreadBySender: { [key: string]: number } = {};
  @Input() selectedUser: User | null = null;
  @Input() messages: Message[] = [];

  @Output() searchChange = new EventEmitter<string>();
  @Output() userSelected = new EventEmitter<User>();
  @Output() sendMessage = new EventEmitter<string>();
}
