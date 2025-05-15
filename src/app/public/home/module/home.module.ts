import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home.component';
import { HeroHomeComponent } from '../components/hero/hero.component';
import { CategoriesSectionComponent } from '../components/categories-section/categories-section.component';
import { CategoryCardComponent } from '../components/categories-section/category-card/category-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResultsRatingComponent } from '../components/results-rating/results-rating.component';
import { CardResultsRatingComponent } from '../components/results-rating/card-results-rating/card-results-rating.component';
import { WhatIsComponent } from '../components/what-is/what-is.component';
import { StepsComponent } from '../components/what-is/steps/steps.component';
import { StepItemComponent } from '../components/what-is/steps/step-item/step-item.component';
import { FeatureItemComponent } from '../components/what-is/feature-item/feature-item.component';


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
    WhatIsComponent,
    StepsComponent,
    StepItemComponent,
    FeatureItemComponent,

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
    WhatIsComponent,
    StepsComponent,
    StepItemComponent,
    FeatureItemComponent,
  ]
})
export class HomeModule { }
