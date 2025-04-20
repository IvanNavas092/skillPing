import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home.component';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, MoveRight, Tag, Search, Users, MessageCircle, CheckCheck } from 'lucide-angular';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { HeroComponent } from '../components/hero/hero.component'; 
import { HowItWorksComponent } from '../components/how-it-works/how-it-works.component';
import { StepsSectionComponent } from '../components/steps-section/steps-section.component';
import { CategoriesSectionComponent } from '../components/categories-section/categories-section.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    HowItWorksComponent,
    StepsSectionComponent,
    CategoriesSectionComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule.pick({ MoveRight, Tag, Search, Users, MessageCircle, CheckCheck }),
    HttpClientModule,

  ],
  exports: [
  ],
  providers: [
    ApiService,

  ]
})
export class PublicModule { }
