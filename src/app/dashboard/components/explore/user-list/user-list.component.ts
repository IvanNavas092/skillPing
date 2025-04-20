import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  
  users : User[] = [];
  
  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
      this.users.sort((a, b) => b.rating_count - a.rating_count);
    })
  }
}
