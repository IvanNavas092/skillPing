import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  error = '';
  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  formFields = [
    { required: true, label: 'Contraseña actual', controlName: 'oldPassword', type: 'password', placeholder: '******' },
    { required: true, label: 'Contraseña nueva', controlName: 'newPassword', type: 'password', placeholder: '******' },
    { required: true, label: 'Confirma contraseña', controlName: 'confirmPassword', type: 'password', placeholder: '******' },
  ];

  onSubmit() {
    if (!this.passwordForm.valid) return;
    console.log(this.passwordForm.value);
    const { oldPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;

    }
    this.authService.changePassword(oldPassword, newPassword).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Contraseña cambiada',
          text: 'La contraseña ha sido cambiada con éxito.',
          showCancelButton: true,
          timer: 2000,
          customClass: {
            confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg',
          }
        })
        this.error = '';
        this.passwordForm.reset();
      },
      error: (err) => {
        this.error = 'Error al cambiar la contraseña.';
        console.log(err);
      }
    });
  }
}
