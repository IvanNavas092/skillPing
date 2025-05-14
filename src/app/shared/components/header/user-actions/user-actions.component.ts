import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
})
export class UserActionsComponent {

  @Input() isLoggedIn: boolean = false;
  @Input() notifications: number = 0;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

}
