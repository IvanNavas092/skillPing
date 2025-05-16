import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Icons
import { RouterModule } from '@angular/router';
import { LogoComponent } from './components/header/logo/logo.component';
import { NavDesktopComponent } from './components/header/nav-desktop/nav-desktop.component';
import { NavMobileComponent } from './components/header/nav-mobile/nav-mobile.component';
import { UserActionsComponent } from './components/header/user-actions/user-actions.component';
import { CallToActionComponent } from '../public/home/components/call-to-action/call-to-action.component';
import { SkillComponent } from './components/skill/skill.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    NavDesktopComponent,
    NavMobileComponent,
    UserActionsComponent,
    CallToActionComponent,
    SkillComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    NavDesktopComponent,
    NavMobileComponent,
    UserActionsComponent,
    CallToActionComponent,
    SkillComponent,
    ChangePasswordComponent,


  ]


})
export class SharedModule { }
