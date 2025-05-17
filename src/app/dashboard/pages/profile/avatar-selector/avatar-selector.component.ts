import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Avatar } from 'src/app/core/models/avatar';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
})
export class AvatarSelectorComponent {
  @Input() avatars: Avatar[] = [];
  @Input() selectedAvatar?: number;
  @Output() avatarSelected = new EventEmitter<number>();

  selectAvatar(avatar: Avatar) {
    this.avatarSelected.emit(avatar.id);
  }

}
