import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {

  constructor(private apiService: ApiService, private authService: AuthService) { }
  currentUser = this.getCurrentUser();
  users : User[] = [];

  
  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data.filter((user: any) =>
        user.id !== this.currentUser.id && user.username !== 'admin');
    })
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }


}
