import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home.component';
import { HeroHomeComponent } from '../components/hero/hero.component';
import { CategoriesSectionComponent } from '../components/categories-section/categories-section.component';
import { CallToActionComponent } from '../components/call-to-action/call-to-action.component';
import { CategoryCardComponent } from '../components/categories-section/category-card/category-card.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    HeroHomeComponent,

    CategoriesSectionComponent,
    CallToActionComponent,
    // sub components (How-it-works)
    // sub components (Steps-Section)
    // sub components (Categories-Section)
    CategoryCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
    
  ]
})
export class HomeModule { }
