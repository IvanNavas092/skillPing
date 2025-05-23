import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// modules
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/module/dashboard.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { PublicModule } from './public/module/public.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { HTTP_INTERCEPTORS, HttpClientModule, } from '@angular/common/http';
import { CsrfInterceptor } from './core/csrf.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import lenguage spanish from pipe
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es-ES');
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    // Angular modules
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PublicModule,
    DashboardModule,
    CoreModule,
    AuthModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule, // for SweetAlert2
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CsrfInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
