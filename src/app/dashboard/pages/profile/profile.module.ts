import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { SkillsManagerComponent } from './skills-manager/skills-manager.component';



@NgModule({
  declarations: [
    // components

    ProfileComponent,
    AvatarSelectorComponent,
    ProfileFormComponent,
    SkillsManagerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [
    ProfileComponent,
    AvatarSelectorComponent,
    ProfileFormComponent,
    SkillsManagerComponent,
  ],
})
export class ProfileModule { }
