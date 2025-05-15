import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home.component';
import { HeroHomeComponent } from '../components/hero/hero.component';
import { CategoriesSectionComponent } from '../components/categories-section/categories-section.component';
import { CategoryCardComponent } from '../components/categories-section/category-card/category-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResultsRatingComponent } from '../components/results-rating/results-rating.component';
import { CardResultsRatingComponent } from '../components/results-rating/card-results-rating/card-results-rating.component';



@NgModule({
  declarations: [
    // components
    HomeComponent,
    // sub components
    HeroHomeComponent,
    CategoriesSectionComponent,
    CategoryCardComponent,
    ResultsRatingComponent,
    CardResultsRatingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    // components
    HomeComponent,
    // sub components
    HeroHomeComponent,
    CategoriesSectionComponent,
    CategoryCardComponent,
    ResultsRatingComponent,
    CardResultsRatingComponent,
  ]
})
export class HomeModule { }
