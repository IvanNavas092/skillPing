import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// modules
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/module/dashboard.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { SearchComponent } from './dashboard/components/explore/search/search.component';
import { FiltersComponent } from './dashboard/components/explore/filters/filters.component';
import { UserListComponent } from './dashboard/components/explore/user-list/user-list.component';


@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      SharedModule,
      DashboardModule,
      CoreModule,
      AuthModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
