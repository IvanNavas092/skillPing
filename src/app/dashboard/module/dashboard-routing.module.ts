import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { HomeComponent } from '../pages/home/home.component';
import { ExploreComponent } from '../pages/explore/explore.component';

const routes: Routes = [
   {
      path: '', component: DashboardComponent,
      children: [
         { path: 'inicio', component: HomeComponent },
         { path: 'explorar', component: ExploreComponent },
         { path: 'sobre-nosotros', component: HomeComponent },
         { path: '', redirectTo: 'inicio', pathMatch: 'full' }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class DashboardRoutingModule { }
