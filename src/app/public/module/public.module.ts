import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from '../home/module/home.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HowItWorksPageModule } from '../how-it-works-page/module/how-it-works-page.module';

@NgModule({
  declarations: [
  ],
  imports: [
    HomeModule,
    HowItWorksPageModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [
    ApiService,

  ]
})
export class PublicModule { }
