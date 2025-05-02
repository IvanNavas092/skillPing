import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// modules
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/module/dashboard.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { PublicModule } from './public/home/module/public.module';
import { AboutComponent } from './public/about/about.component';
import { SearchChatComponent } from './dashboard/components/chat/search-chat/search-chat.component';
import { UserCardComponent } from './dashboard/components/explore/user-list/user-card/user-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PublicModule,
    DashboardModule,
    CoreModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
