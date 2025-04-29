import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { LucideAngularModule, Search,  } from 'lucide-angular';

import { ApiService } from 'src/app/core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ExploreComponent } from '../pages/explore/explore.component';
import { SearchComponent } from '../components/explore/search/search.component';
import { FiltersComponent } from '../components/explore/filters/filters.component';
import { UserListComponent } from '../components/explore/user-list/user-list.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '../pages/profile/profile.component';
import { allComponent } from '../components/chat/all/all.component';
import { ChatComponent } from '../pages/chat/chat.component';
  // poner los componentes que vamos a usar (Home, Cursos, Sobre Nosotros...etc)
@NgModule({
  declarations: [
    DashboardComponent,

    // pages
    ExploreComponent,
    ProfileComponent,
    ChatComponent,

    // components
    SearchComponent,
    FiltersComponent,
    UserListComponent,
    allComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    DashboardRoutingModule,
    HttpClientModule,
    LucideAngularModule.pick({ Search }),

  ],
  exports: [
    DashboardComponent,

    // pages
    ExploreComponent,
    ProfileComponent,
    ChatComponent,

    // components
    SearchComponent,
    FiltersComponent,
    UserListComponent,
    allComponent,
  ],
  providers: [
    ApiService
  ]
})
export class DashboardModule { }
