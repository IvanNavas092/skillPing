import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { ExploreComponent } from '../pages/explore/explore.component';
import { UserDetailComponent } from '../pages/user-detail/user-detail.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { ChatComponent } from '../pages/chat/chat.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'explorar', component: ExploreComponent },
      { path: 'explorar/:id', component: UserDetailComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'chat', component: ChatComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
