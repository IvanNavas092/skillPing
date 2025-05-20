import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { StepBasicComponent } from './register/components/step-basic/step-basic.component';
import { StepSkillsComponent } from './register/components/step-skills/step-skills.component';

@NgModule({
  declarations: [
    // login
    LoginComponent,
    // register
    RegisterComponent,
    StepBasicComponent,
    StepSkillsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],

  exports: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule { }
