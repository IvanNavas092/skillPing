import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';
import { AvatarService } from './services/avatar.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,

  ],
  exports: [
    HttpClientModule,
  ],
  providers: [
    ApiService,
    ChatService,
    AuthService,
    AvatarService

  ]
})

export class CoreModule { }
