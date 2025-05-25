import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/Category';
import { Skill } from 'src/app/core/models/skill';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

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

  registerForm: FormGroup;

  allSkills: Skill[] = [];
  allCategories: Category[] = [];

  knownSkills: number[] = [];
  skillsToLearn: number[] = [];

  selectedSkillsInStep2: number[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  formFields = [
    {
      id: 'full_name', label: 'Nombre completo', controlName: 'full_name', type: 'text', placeholder: 'Nombre Apellido',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
      ]
    },
    {
      id: 'username', label: 'Nombre de usuario', controlName: 'username', type: 'text', placeholder: 'ejemplo01',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'El usuario debe tener al menos 6 caracteres' }
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

  nextStep() {
    if (this.currentStep === 2) {
      this.selectedSkillsInStep2 = [...this.knownSkills]

    }
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

  // skill selection (with limit of 3)
  toggleSkill(skillId: number, list: number[]) {

    // in step 3 don't let select skills already known
    if (this.currentStep === 3 && this.selectedSkillsInStep2.includes(skillId)) {
      this.errorMessage = 'Esta habilidad ya fue seleccionada en el paso anterior';
      setTimeout(() => this.errorMessage = '', 3000);

    }

    const index = list.indexOf(skillId); // index of skill in list
    // if already selected, remove
    if (index !== -1) {
      list.splice(index, 1);
    }
    // if not selected and there are less than 3, add
    else if (list.length < 3) {
      list.push(skillId);
    }
    else {
      this.errorMessage = 'Máximo 3 habilidades';
      setTimeout(() => this.errorMessage = '', 3000);
    }
  }


  // check if a skill is selected
  isSkillSelected(skillId: number): boolean {
    if (this.currentStep === 2) {
      return this.knownSkills.includes(skillId);
    }
    else {
      return this.skillsToLearn.includes(skillId);
    }
  }
  isSkillDisabled(skillId: number): boolean {
    return this.currentStep === 3 && this.selectedSkillsInStep2.includes(skillId);
  }

  // get skills
  getSkills() {
    this.apiService.getSkills().subscribe((data) => {
      this.allSkills = data;
      console.log('Skills:', this.allSkills);
    });
  }

  // get categories
  getCategories() {
    this.apiService.getCategories().subscribe((data) => {
      this.allCategories = data;
    });
  }

  // scroll to top when stepping
  scrollToTop() {
    this.formContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }



  // on submit
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
          Swal.fire({
            icon: "success",
            title: "Cuenta creada",
            text: "¡Tu cuenta ha sido creada exitosamente!",
            showCancelButton: true,
            confirmButtonText: 'Iniciar Sesión',
            cancelButtonText: '¿Cómo Funciona?',
            customClass: {
              confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg',
              cancelButton: 'bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg ml-2'
            },

          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
            else {
              this.router.navigate(['/como-funciona']);
            }
          });

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


