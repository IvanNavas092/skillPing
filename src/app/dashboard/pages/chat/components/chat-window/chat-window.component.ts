import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewChecked,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { User } from 'src/app/core/models/User';
import { Message } from 'src/app/core/models/chat-message';
import { AvatarService } from 'src/app/core/services/avatar.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent
  implements AfterViewChecked, OnChanges {
  @Input() selectedUser: User | null = null;
  @Input() messages: Message[] = [];

  @Output() sendMessage = new EventEmitter<string>();

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  messageText = '';
  shouldScroll = false;

  constructor(private avatarService: AvatarService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages']) {
      this.shouldScroll = true;
    }
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  scrollToBottom() {
    try {
      const c: HTMLElement = this.messagesContainer.nativeElement;
      c.scrollTo({ top: c.scrollHeight });
    } catch (e) {
      console.error(e);
    }
  }

  onSend() {
    if (!this.messageText.trim()) return;
    this.sendMessage.emit(this.messageText.trim());
    this.messageText = '';
  }

  getAvatar(id: number | undefined) {
    return this.avatarService.getAvatarById(id);
  }
}
