import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from '../dashboard.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AvatarService } from 'src/app/core/services/avatar.service';
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
    SharedModule,
],
  exports: [
    DashboardComponent,
  ],
  providers: [
    ApiService, AvatarService
  ]
})
export class DashboardModule { }
