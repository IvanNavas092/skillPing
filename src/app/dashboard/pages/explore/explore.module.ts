import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { SearchComponent } from './search/search.component';
import { FiltersComponent } from './filters/filters.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { UserCardComponent } from './user-list/user-card/user-card.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    // components
    ExploreComponent,
    // subComponents
    SearchComponent,
    FiltersComponent,
    UserListComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    LucideAngularModule,
    SharedModule
  ],
  exports: [
    // page
    ExploreComponent,
    // subComponents
    SearchComponent,
    FiltersComponent,
    UserListComponent,
    UserCardComponent,
  ],
})
export class ExploreModule { }
