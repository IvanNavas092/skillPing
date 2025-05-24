import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from '../footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { NavDesktopComponent } from './nav-desktop/nav-desktop.component';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { MatTooltipDefaultOptions, MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';

const customTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 200,
  hideDelay: 100,
  touchGestures: 'on', // <-- habilita touch
  touchendHideDelay: 0
};

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
  ],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults }
  ]
})
export class HeaderModule { }
