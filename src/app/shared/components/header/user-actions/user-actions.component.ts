import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AvatarService } from 'src/app/core/services/avatar.service';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
})
export class UserActionsComponent {
  avatarId = this.getCurrentUser().avatar;
  @Input() isLoggedIn: boolean = false;
  @Input() notifications: number = 0;

  constructor(private authService: AuthService, private avatarService: AvatarService) { }

  getAvatar(avatarId: number | undefined) {
    return this.avatarService.getAvatarById(avatarId);
  }

  logout() {
    this.authService.logout();
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

}
