import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { SearchChatComponent } from './components/search-chat/search-chat.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChatSidebarComponent } from './components/chat-sidebar/chat-sidebar.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ChatDesktopComponent } from './components/chat-desktop/chat-desktop.component';
import { ChatMobileComponent } from './components/chat-mobile/chat-mobile.component';

@NgModule({
  declarations: [
    // components
    ChatComponent,
    // subComponents
    SearchChatComponent,
    ChatSidebarComponent,
    ChatWindowComponent,
    ChatDesktopComponent,
    ChatMobileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    ChatComponent,
    SearchChatComponent,
    ChatSidebarComponent,
    ChatWindowComponent
  ]
})
export class ChatModule { }
