import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingCardComponent } from './rating-card/rating-card.component';
import { RatingFormComponent } from './rating-form/rating-form.component';
import { UserDetailComponent } from './user-detail.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    // components
    UserDetailComponent,
    // sub components
    RatingCardComponent,
    RatingFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [
    RatingCardComponent,
    RatingFormComponent,
  ],
  providers: [
  ]
})
export class UserDetailModule { }
