import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { allComponent } from './all/all.component';
import { SearchChatComponent } from './search-chat/search-chat.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    // components
    ChatComponent,
    // subComponents
    allComponent,
    SearchChatComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ]
})
export class ChatModule { }
