import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { User } from 'src/app/core/models/User';
import { AvatarService } from 'src/app/core/services/avatar.service';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html'
})
export class ChatSidebarComponent {

  constructor(private avatarService: AvatarService) { }
  @Input() users: User[] = [];
  @Input() unreadBySender: { [key: string]: number } = {};
  @Input() selectedUser: User | null = null;

  @Output() searchChange = new EventEmitter<string>();
  @Output() userSelected = new EventEmitter<User>();

  onSearch(term: string) {
    this.searchChange.emit(term);
  }

  selectUser(u: User) {
    this.userSelected.emit(u);
  }

  getAvatar(id: number | undefined) {
    return this.avatarService.getAvatarById(id);
  }
}
