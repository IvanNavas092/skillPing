import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from '../pages/home/home.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { LucideAngularModule, MoveRight, Tag, Search, Users, MessageCircle, CheckCheck } from 'lucide-angular';
import { HeroComponent } from '../components/home/hero/hero.component';
import { HowItWorksComponent } from '../components/home/how-it-works/how-it-works.component';
import { StepsSectionComponent } from '../components/home/steps-section/steps-section.component';
import { CategoriesSectionComponent } from '../components/home/categories-section/categories-section.component';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ExploreComponent } from '../pages/explore/explore.component';
import * as Aos from 'aos';
import { SearchComponent } from '../components/explore/search/search.component';
import { FiltersComponent } from '../components/explore/filters/filters.component';
import { UserListComponent } from '../components/explore/user-list/user-list.component';

// poner los componentes que vamos a usar (Home, Cursos, Sobre Nosotros...etc)
@NgModule({
   declarations: [
      DashboardComponent,

      // pages
      HomeComponent,
      ExploreComponent,


      // components
      HeroComponent,
      HowItWorksComponent,
      StepsSectionComponent,
      CategoriesSectionComponent,
      SearchComponent,
      FiltersComponent,
      UserListComponent,
   ],
   imports: [
      CommonModule,
      RouterModule,
      DashboardRoutingModule,
      HttpClientModule,
      LucideAngularModule.pick({ MoveRight, Tag, Search, Users, MessageCircle, CheckCheck }),
      
   ],
   exports: [

   ],
   providers: [
      ApiService
   ]
})
export class DashboardModule { }
