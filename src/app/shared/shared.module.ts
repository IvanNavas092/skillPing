import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Icons
import { RouterModule } from '@angular/router';

import { SkillComponent } from './components/skill/skill.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from './components/header/header.module';
import { CallToActionComponent } from '../public/home/components/call-to-action/call-to-action.component';



@NgModule({
  declarations: [
    SkillComponent,
    ChangePasswordComponent,
    CallToActionComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HeaderModule,

  ],
  exports: [
    SkillComponent,
    ChangePasswordComponent,
    CallToActionComponent,
    HeaderModule,
  ],
  providers: [
  ]


})
export class SharedModule { }
