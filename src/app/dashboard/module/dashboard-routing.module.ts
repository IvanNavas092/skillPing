import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { ExploreComponent } from '../pages/explore/explore.component';
import { UserDetailComponent } from '../pages/user-detail/user-detail.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { ChatComponent } from '../pages/chat/chat.component';
import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'explorar', component: ExploreComponent },
      { path: 'explorar/categoria/:categoryName', component: ExploreComponent },
      { path: 'explorar/usuario/:id', component: UserDetailComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'chat/chat-usuario/:id', component: ChatComponent },
      { path: 'change-password', component: ChangePasswordComponent}, 
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
