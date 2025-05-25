import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../style/styles_login_register.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage!: string;
  passwordVisible: boolean = false;

  formFields = [
    { id: 'username', label: 'Nombre de usuario', controlName: 'username', type: 'text', placeholder: 'Introduce tu Usuario' },
    { id: 'password', label: 'Contraseña', controlName: 'password', type: 'password', placeholder: 'Introduce tu Contraseña' }
  ];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  // form submit
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value; // get values

      this.authService.login(username, password).subscribe({
        next: (response) => {
          console.log('Login exitoso', response);
          this.router.navigate(['/dashboard/explorar']);
        },
        error: (e) => {
          this.errorMessage = 'Usuario o contraseña incorrectos';
          console.log('Error en el login', e);
        }
      });
    }
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
    console.log(this.passwordVisible);
  }
}



