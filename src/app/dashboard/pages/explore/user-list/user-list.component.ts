import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import user from 'pusher-js/types/src/core/user';


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
  usersLoaded = false; // flag to check if users are loaded
  activeCategoryFromRoute: string | null = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.setupRouteListener();
  }

  // if filterActive or search changed, apply filters again
  ngOnChanges(changes: SimpleChanges) {
    // only if users are loaded
    if (!this.usersLoaded) return;

    // Si cambió filterActive o search, reaplico filtros
    if (changes['filterActive'] || changes['search']) {
      this.filterUsers();
    }
  }

  // listener to route params url to get category
  setupRouteListener(): void {
    this.router.paramMap.subscribe(params => {
      this.activeCategoryFromRoute = params.get('categoryName');
      // if users are loaded, filter them
      if (this.usersLoaded) {
        this.filterUsers();
      }
    });
  }


  // load users from apiService and filter them
  loadUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.allUsers = data.filter((user) =>
        user.id !== this.currentUser.id && user.username !== 'admin');
      this.usersFiltered = [...this.allUsers];
      // users Loaded
      this.usersLoaded = true;
      // filter users
      this.filterUsers();
    })
  }

  // filter users
  filterUsers() {
    // choose category (from component or route)
    const category = this.filterActive || this.activeCategoryFromRoute;

    if (category) {
      this.apiService.getUsersByFilterCategorie(category)
        .subscribe(data => {
          // filter users
          const baseList = data.filter((u: any) =>
            u.id !== this.currentUser.id && u.username !== 'admin'
          );
          this.applySearchFilterTo(baseList);
        });
    } else {
      // without category, filter users by search
      this.applySearchFilterTo(this.allUsers);
    }
  }

  // filter users by search
  applySearchFilterTo(list: User[]) {
    const term = this.search?.trim().toLowerCase();
    if (term) {
      this.usersFiltered = list.filter(u =>
        u.username.toLowerCase().includes(term));
    } else {
      // if search is empty, show all users
      this.usersFiltered = [...list];
    }
  }

  // obtain current user
  getCurrentUser() {
    return this.authService.getCurrentUser();
  }


}
