import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav-desktop',
  templateUrl: './nav-desktop.component.html',
})
export class NavDesktopComponent implements OnInit {
  @Input() categories: any;
  @Input() goToExploreWithCategory!: (category: string) => void;

  constructor(private authService: AuthService, private router: Router) {

  }
  ngOnInit(): void {
    console.log(this.categories);
  }

  logout() {
    this.authService.logout();
  }

}
