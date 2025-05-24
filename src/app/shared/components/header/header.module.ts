import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from '../footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { NavDesktopComponent } from './nav-desktop/nav-desktop.component';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    NavDesktopComponent,
    NavMobileComponent,
    UserActionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTooltipModule,   
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    NavDesktopComponent,
    NavMobileComponent,
    UserActionsComponent,
  ]
})
export class HeaderModule { }
