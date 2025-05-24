import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { HomeComponent } from './public/home/home.component';
import { HowItWorksPageComponent } from './public/how-it-works-page/how-it-works-page.component';


const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/module/dashboard.module').then(m => m.DashboardModule)
  },

  { path: '', component: HomeComponent },
  { path: 'como-funciona', component: HowItWorksPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // for rating section (automatic scroll)
    anchorScrolling: 'enabled',
    // restoration of scroll position
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
