import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { Message } from 'src/app/core/models/chat-message';
import { AvatarService } from 'src/app/core/services/avatar.service';


@Component({
  selector: 'app-chat-mobile',
  templateUrl: './chat-mobile.component.html',
  styleUrls: ['../chat-window/chat-window.component.css']
})
export class ChatMobileComponent {
  @Input() users: User[] = [];
  @Input() unreadBySender: { [key: string]: number } = {};
  @Input() selectedUser: User | null = null;
  @Input() messages: Message[] = [];

  @Output() searchChange = new EventEmitter<string>();
  @Output() userSelected = new EventEmitter<User>();
  @Output() sendMessage = new EventEmitter<string>();
  text: string = '';
  view: 'list' | 'chat' = 'list';

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  shouldScroll = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages']) {
      this.shouldScroll = true;
    }
  }

  ngAfterViewChecked() {
    if (this.view === 'chat') {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }
  scrollToBottom() {
    if (this.shouldScroll) {
      try {
        const c: HTMLElement = this.messagesContainer.nativeElement;
        c.scrollTo({ top: c.scrollHeight });
      } catch (e) {
        console.error(e);
      }
    }
  }


  constructor(private avatarService: AvatarService) { }

  onSelect(user: User) {
    this.userSelected.emit(user);
    this.view = 'chat';
  }
  backToList() {
    this.view = 'list';
  }

  getAvatar(id: number | undefined) {
    return this.avatarService.getAvatarById(id);
  }

  send() {
    if (!this.text.trim()) return;
    this.sendMessage.emit(this.text);
    this.text = '';  // limpia el input tras enviar
  }

}
