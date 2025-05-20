import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AvatarService } from 'src/app/core/services/avatar.service';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
})
export class NavMobileComponent {
  @Input() categories: any;
  @Input() isLoggedIn: boolean = false;
  @Input() notifications: number = 0;
  @Input() goToExploreWithCategory!: (category: string) => void;
  menuOpen = false;
  submenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private avatarService: AvatarService
  ) { }


  toggleSubmenu() {
    this.submenuOpen = !this.submenuOpen;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
  }

  getCurrentUserAvatar() {
    return this.authService.getCurrentUser().avatar;
  }

  getAvatar(avatarId: number | undefined) {
    return this.avatarService.getAvatarById(avatarId);
  }
}
