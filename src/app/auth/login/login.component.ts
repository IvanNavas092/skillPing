import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent   {
  loginForm: FormGroup;

  formFields = [
    { id: 'name', label: 'Nombre completo', controlName: 'name', type: 'text' },
    { id: 'username', label: 'Nombre de usuario', controlName: 'username', type: 'text' },
    { id: 'email', label: 'Email', controlName: 'email', type: 'email' },
    { id: 'password', label: 'Contraseña', controlName: 'password', type: 'password' }
  ];

  constructor(private fb: FormBuilder) { 
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }



}
