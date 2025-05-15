import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Icons
import { LucideAngularModule, Tag, MoveRight, User, MessageCircle, MessageCircleMore, CheckCheck, Users, Search, Eye, EyeOff } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { LogoComponent } from './components/header/logo/logo.component';
import { NavDesktopComponent } from './components/header/nav-desktop/nav-desktop.component';
import { NavMobileComponent } from './components/header/nav-mobile/nav-mobile.component';
import { UserActionsComponent } from './components/header/user-actions/user-actions.component';
import { CallToActionComponent } from '../public/home/components/call-to-action/call-to-action.component';
import { SkillComponent } from './components/skill/skill.component';




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
  ],
  imports: [
    CommonModule,
    LucideAngularModule.pick({ Tag, MoveRight, User, MessageCircle, MessageCircleMore, CheckCheck, Users, Search, Eye, EyeOff }),
    RouterModule
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
    LucideAngularModule

  ]


})
export class SharedModule { }
