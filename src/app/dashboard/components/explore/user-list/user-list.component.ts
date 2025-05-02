import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/Category';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit, OnChanges {

  @Input() filterActive!: string;
  @Input() search!: string;
  currentUser = this.getCurrentUser();
  allUsers: User[] = [];
  usersFiltered: User[] = [];

  activeCategoryFromRoute: string | null = '';
  usersLoaded = false; // flag to check if users are loaded
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.setupRouteListener();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.usersLoaded && changes['filterActive'] || changes['search'])
      this.filterUsers();
      // when filterActive is choosed, is null the activeCategoryFromRoute
      this.activeCategoryFromRoute = null;
  }

  setupRouteListener(): void {
    this.router.paramMap.subscribe(params => {
      this.activeCategoryFromRoute = params.get('categoryName');
      // if users are loaded, filter them
      if (this.usersLoaded) {
        this.filterUsers();
      }
    });
  }



  loadUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.allUsers = data.filter((user: any) =>
        user.id !== this.currentUser.id && user.username !== 'admin');
      this.usersFiltered = [...this.allUsers];
      this.usersLoaded = true;

      // filter users
      this.filterUsers();
      this.applySearchFilter();
    })

    // Aplica búsqueda si existe al cargar
  }

  // filter users
  filterUsers() {
    // choose category (from route or component)
    const categoryName = this.filterActive || this.activeCategoryFromRoute;

    if (categoryName) {
      this.filterByCategory(categoryName);
    }
    else {
      this.usersFiltered = [...this.allUsers];
      this.loadUsers();
    }
  }

  // filter users by category
  filterByCategory(category: string) {
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

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }


}
