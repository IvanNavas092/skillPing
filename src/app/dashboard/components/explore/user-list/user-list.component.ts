import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/Category';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit, OnChanges {

  @Input() filterActive!: Category;
  @Input() search!: string;
  currentUser = this.getCurrentUser();
  allUsers: User[] = [];
  usersFiltered: User[] = [];

  activeCategoryFromRoute: string | null = '';

  constructor(private apiService: ApiService, private authService: AuthService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUsers();
    this.setupRouteListener();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterActive'] || changes['search'])
      this.filterUsers();
  }

  setupRouteListener(): void {
    this.router.paramMap.subscribe(params => {
      this.activeCategoryFromRoute = params.get('categoryName');
      this.filterUsers();
    });
  }

  // filter users
  filterUsers() {
    // choose category (from route or component)
    const categoryName = this.filterActive?.name || this.activeCategoryFromRoute;
    // filter with category 
    if (categoryName) {
      this.filterByCategory(categoryName);
      console.log(categoryName);
    }
    else {
      this.loadUsers();
    }

  }

  // filter users by category
  filterByCategory(category: Category | string) {
    this.apiService
      .getUsersByFilterCategorie(category)
      .subscribe((data) => {
        this.usersFiltered = data;
        // apply search filter
        this.applySearchFilter();
        
      });
  }

  // filter users by search
  applySearchFilter() {
    if (this.search) {
      this.usersFiltered = this.usersFiltered.filter(user =>
        user.username.toLowerCase().includes(this.search.toLowerCase()));
    }
  }

  loadUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.allUsers = data.filter((user: any) =>
        user.id !== this.currentUser.id && user.username !== 'admin');
      this.usersFiltered = [...this.allUsers];
      this.applySearchFilter();
    })

    // Aplica búsqueda si existe al cargar
  }


  getCurrentUser() {
    return this.authService.getCurrentUser();
  }


}
