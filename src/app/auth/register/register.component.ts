import { Block } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/Category';
import { Skill } from 'src/app/core/models/skill';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  currentStep = 1;
  totalSteps = 3;

  @ViewChild('formContainer') formContainer!: ElementRef

  // Formulario principal
  registerForm: FormGroup;

  // Lista de skills disponibles
  allSkills : Skill[] = [];
  allCategories: Category[] = [];

  // Skills seleccionadas
  selectedSkills: string[] = [];
  interestedSkills: string[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  formFields = [
    { id: 'name', label: 'Nombre completo', controlName: 'name', type: 'text' },
    { id: 'username', label: 'Nombre de usuario', controlName: 'username', type: 'text',
      validations: [
        {type: 'required', message: 'Este campo es obligatorio'},
        {type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres'}
      ] },
    { id: 'email', label: 'Email', controlName: 'email', type: 'email',
      validations: [
        {type: 'required', message: 'Este campo es obligatorio'},
        {type: 'email', message: 'El correo debe ser válido'}
      ]
    },
    { id: 'password', label: 'Contraseña', controlName: 'password', type: 'password',
      validations: [
        {type: 'required', message: 'Este campo es obligatorio'},
        {type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres'}
      ]
    }
  ];


  ngOnInit(): void {
    this.getSkills();
    this.getCategories();
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

  // Seleccionar skill
  toggleSkill(skill: string, list: string[]) {
    const index = list.indexOf(skill);
    // si no esta en la lista, lo agrega
    if (index === -1) {
      list.push(skill);
      // si esta en la lista, lo elimina
    } else {
      list.splice(index, 1);
    }

    this.selectedSkills = list;
  }

  // Verificar si una skill esta seleccionado
  isSkillSelected(skill: string, list: string[]): boolean {
    return list.includes(skill);
  }

  // Recoger las skills
  getSkills() {
    this.apiService.getSkills().subscribe((data) => {
      this.allSkills = data;
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
      const formData = {
        ...this.registerForm.value,
        skills: this.selectedSkills,
        interestedSkills: this.interestedSkills
      };
      console.log('Datos del formulario:', formData);
      // Aquí iría tu llamada al servicio de registro
    }
  }


}