import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/Category';
import { Skill } from 'src/app/core/models/skill';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../style/styles_login_register.css']
})
export class RegisterComponent implements OnInit {
  currentStep = 1;
  totalSteps = 3;
  errorMessage!: string;

  @ViewChild('formContainer') formContainer!: ElementRef

  // Formulario principal
  registerForm: FormGroup;

  // Lista de skills disponibles
  allSkills: Skill[] = [];
  allCategories: Category[] = [];

  // Skills seleccionadas
  knownSkills: number[] = [];
  skillsToLearn: number[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      full_name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  formFields = [
    { id: 'full_name', label: 'Nombre completo', controlName: 'full_name', type: 'text', placeholder: 'Nombre Apellido' },
    {
      id: 'username', label: 'Nombre de usuario', controlName: 'username', type: 'text', placeholder: 'ejemplo01',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
      ]
    },
    {
      id: 'email', label: 'Email', controlName: 'email', type: 'email', placeholder: 'ejemplo@gmail.com',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'email', message: 'El correo debe ser válido' }
      ]
    },
    {
      id: 'password', label: 'Contraseña', controlName: 'password', type: 'password', placeholder: '********',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' }
      ]
    }
  ];


  ngOnInit(): void {
    this.getSkills();
    this.getCategories();
    console.log(this.registerForm)
  }

  // Navegación entre pasos
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.scrollToTop();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.scrollToTop();
    }
  }

  // Seleccionar skill (con límite de 3)
  toggleSkill(skillId: number, list: number[]) {
    const index = list.indexOf(skillId);

    // Si ya está seleccionada, la quitamos
    if (index !== -1) {
      list.splice(index, 1);
    }
    // Si no está seleccionada y hay menos de 3, la agregamos
    else if (list.length < 3) {
      list.push(skillId);
    }
    // Si ya hay 3 seleccionadas, mostramos mensaje (opcional)
    else {
      this.errorMessage = 'Máximo 3 habilidades permitidas';
      setTimeout(() => this.errorMessage = '', 3000); // Mensaje desaparece después de 3 segundos
    }
  }


  // Verificar si una skill esta seleccionada
  isSkillSelected(skillId: number, list: number[]): boolean {
    return list.includes(skillId);
  }

  // Recoger las skills
  getSkills() {
    this.apiService.getSkills().subscribe((data) => {
      this.allSkills = data;
      console.log('Skills:', this.allSkills);
    });
  }

  // Recoger las categorías
  getCategories() {
    this.apiService.getCategories().subscribe((data) => {
      this.allCategories = data;
    });
  }

  // Volver hacia arriba al pasar de paso
  scrollToTop() {
    this.formContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }



  // Envío del formulario
  onSubmit() {
    if (this.registerForm.valid) {
      const userData = {
        ...this.registerForm.value,
        skills: this.knownSkills,
        interests: this.skillsToLearn
      }

      console.log('Datos de registro:', userData);
      this.authService.register(userData).subscribe({
        next: () => {
          console.log('Registro exitoso');
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          this.handleError(error);
        }
      })

    }
  }




  handleError(error: any) {
    console.log('Error completo ->', error);
    if (error.error) {
      if (error.error.username)
        this.errorMessage = `Usuario: ${error.error.username.join(', ')}`;
      else if (error.error.email)
        this.errorMessage = `Email: ${error.error.email.join(', ')}`;
      else
        this.errorMessage = 'Error en el registro. Por favor intente nuevamente.';

    }
    else {
      this.errorMessage = 'Error de conexión con el servidor';
    }
  }

}


