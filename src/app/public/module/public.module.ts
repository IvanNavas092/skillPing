import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, MoveRight, Tag, Search, Users, MessageCircle, CheckCheck } from 'lucide-angular';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { HeroComponent } from '../home/components/hero/hero.component';
import { HowItWorksComponent } from '../home/components/how-it-works/how-it-works.component';
import { StepsSectionComponent } from '../home/components/steps-section/steps-section.component';
import { CategoriesSectionComponent } from '../home/components/categories-section/categories-section.component';
import { WorksCardComponent } from '../home/components/how-it-works/works-card/works-card.component';
import { StepCardComponent } from '../home/components/steps-section/step-card/step-card.component';
import { CategoryCardComponent } from '../home/components/categories-section/category-card/category-card.component';
import { CallToActionComponent } from '../home/components/call-to-action/call-to-action.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    HowItWorksComponent,
    StepsSectionComponent,
    CategoriesSectionComponent,
    CallToActionComponent,

    // sub components (How-it-works)
    WorksCardComponent,
    // sub components (Steps-Section)
    StepCardComponent,
    // sub components (Categories-Section)
    CategoryCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule.pick({ MoveRight, Tag, Search, Users, MessageCircle, CheckCheck }),
    HttpClientModule,
  ],
  exports: [
    HomeComponent,
    HeroComponent,
    HowItWorksComponent,
    StepsSectionComponent,
    CategoriesSectionComponent,

    // sub components (How-it-works)
    WorksCardComponent,
    // sub components (Steps-Section)
    StepCardComponent,
    // sub components (Categories-Section)
    CategoryCardComponent,
  ],
  providers: [
    ApiService,

  ]
})
export class PublicModule { }
