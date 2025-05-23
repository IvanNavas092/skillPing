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
  @Input() messages: Message[] = []
  @Output() sendMessage = new EventEmitter<string>();

  // ID of container to scroll
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  messageText = '';
  shouldScroll = false;

  constructor(private avatarService: AvatarService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages']) {
      this.shouldScroll = true;
    }
  }

  // scroll to bottom when messages change
  ngAfterViewChecked() {
    if (this.shouldScroll) {
      setTimeout(() => {
        this.scrollToBottom();
        this.shouldScroll = false;
      }, 300);
    }
  }

  // scroll to bottom of scroll in the chat window
  scrollToBottom() {
    try {
      const c: HTMLElement = this.messagesContainer.nativeElement;
      c.scrollTo({ top: c.scrollHeight });
    } catch (e) {
      console.error(e);
    }
  }

  // click on send button
  onSend() {
    if (!this.messageText.trim()) return;
    this.sendMessage.emit(this.messageText.trim());
    this.messageText = '';
  }

  getAvatar(id: number | undefined) {
    return this.avatarService.getAvatarById(id);
  }
}
