import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsSectionComponent } from '../components/steps-section/steps-section.component';
import { StepCardComponent } from '../components/steps-section/step-card/step-card.component';
import { HowItWorksComponent } from '../components/how-it-works/how-it-works.component';
import { WorksCardComponent } from '../components/how-it-works/work-card/work-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HowItWorksPageComponent } from '../how-it-works-page.component';
import { HeroWorksComponent } from '../components/hero-works/hero-works.component';
import { LucideAngularModule } from 'lucide-angular';


@NgModule({
  declarations: [
    // components
    HowItWorksPageComponent,
    // sub-components
    StepsSectionComponent,
    StepCardComponent,
    HowItWorksComponent,
    WorksCardComponent,
    HeroWorksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LucideAngularModule,

  ],
  exports: [
    // components
    HowItWorksPageComponent,
    // sub-components
    StepsSectionComponent,
    StepCardComponent,
    HowItWorksComponent,
    WorksCardComponent,
    HeroWorksComponent
  ]
})
export class HowItWorksPageModule { }
