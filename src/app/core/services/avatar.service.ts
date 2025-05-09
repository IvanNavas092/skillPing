import { Injectable } from '@angular/core';
import { Avatar } from '../models/avatar';

@Injectable()
export class AvatarService {

  avatars: Avatar[] = [
    { id: 1, name: 'Héctor', img: '/assets/avatar/man_avatar_1.png', selected: false },
    { id: 2, name: 'Manuel', img: '/assets/avatar/man_avatar_2.png', selected: false },
    { id: 3, name: 'Ana', img: '/assets/avatar/woman_avatar_3.png', selected: false },
    { id: 4, name: 'Ingrid', img: '/assets/avatar/woman_avatar_2.png', selected: false },
  ]

  getAvatars() {
    return this.avatars;
  }
  getAvatarById(id: number | undefined) {
    return this.avatars.find(avatar => avatar.id === id);
  }

  

}
