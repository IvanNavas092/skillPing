import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';

import { ApiService } from 'src/app/core/services/api.service';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '../pages/profile/profile.component';

import { AvatarService } from 'src/app/core/services/avatar.service';
import { UserDetailComponent } from '../pages/user-detail/user-detail.component';
import { RatingCardComponent } from '../pages/user-detail/rating-card/rating-card.component';
import { RatingFormComponent } from '../pages/user-detail/rating-form/rating-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatModule } from '../pages/chat/chat.module';
import { ExploreModule } from '../pages/explore/explore.module';
import { ProfileModule } from '../pages/profile/profile.module';
import { UserDetailModule } from '../pages/user-detail/user-detail.module';


  // poner los componentes que vamos a usar (Home, Cursos, Sobre Nosotros...etc)
@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    DashboardRoutingModule,
    ChatModule,
    ExploreModule,
    ProfileModule,
    UserDetailModule,
],
  exports: [
    DashboardComponent,
  ],
  providers: [
    ApiService, AvatarService
  ]
})
export class DashboardModule { }
