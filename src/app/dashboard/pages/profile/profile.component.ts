import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Avatar } from 'src/app/core/models/avatar';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';
import { Skill } from 'src/app/core/models/skill';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { AvatarService } from 'src/app/core/services/avatar.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  avatars: Avatar[] = [];
  user!: User;
  formProfile!: FormGroup;
  countries: string[] = [];

  // User skills
  KnownSkills: any[] = [];
  SkillsToLearn: any[] = [];
  allSkills: Skill[] = [];

  // avatars
  selectedAvatar: Avatar | undefined;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private avatarService: AvatarService
  ) { }



  // lista de fields con validations
  formFields = [
    {
      id: 1, label: 'Nombre completo', controlName: 'full_name', type: 'text', placeholder: 'Nombre Apellido',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
      ]
    },
    {
      id: 2, label: 'Nombre de usuario', controlName: 'username', type: 'text', placeholder: 'ejemplo01',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
      ]
    },
    {
      id: 3, label: 'Email', controlName: 'email', type: 'email', placeholder: 'ejemplo@gmail.com',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
      ]
    },
    {
      id: 4, label: 'Contraseña', controlName: 'password', type: 'password', placeholder: '********',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
      ]
    },
    {
      id: 5, label: 'Edad', controlName: 'age', type: 'number', placeholder: 'Ejemplo: 25',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
      ]
    },
    {
      id: 6, label: 'Localidad', controlName: 'location', type: 'select', placeholder: 'Selecciona una opción',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
      ]
    },
    { id: 7, label: 'genero', controlName: 'gender', type: 'select', placeholder: 'Ejemplo: Masculino' },
    { id: 8, label: 'Descripción', controlName: 'description', type: 'text', placeholder: 'Ejemplo: Soy un usuario', },
  ]

  selectFields = [
    { label: 'Habilidades' },
    { label: 'Intereses' },
  ]
  // genders choices
  genders = ['Masculino', 'Femenino', 'Otro']

  ngOnInit(): void {
    // take user from sessionStorage
    this.user = this.authService.getCurrentUser();
    // take avatars from avatarService
    this.avatars = this.avatarService.getAvatars();

    this.formProfile = this.fb.group({
      full_name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: [{value: '', disabled: true}, ],
      age: ['', Validators.required],
      location: ['', Validators.required],
      gender: ['', Validators.required],
      description: ['', Validators.minLength(10)],
      skills: ['', ],
      interests: ['', ]
    })
    this.getCountriesOptions();
    this.patchForm(this.user);
    this.getSkills();
    this.getSkillsUser(this.user);
    
    console.log(this.countries);

  }

  patchForm(user: User) {
    this.formProfile.patchValue(user);
  }

  getSkills() {
    this.apiService.getSkills().subscribe((data) => {
      this.allSkills = data;
    });
  }

  getSkillsUser(user: User) {
    if (this.user.skills.length > 0) {
      this.KnownSkills = user.skills.map(skill => skill.name)
    }
    if (this.user.interests.length > 0) {
      this.SkillsToLearn = user.interests.map(skill => skill.name)
    }
    console.log('aprender', this.KnownSkills, 'enseñar', this.SkillsToLearn);
  }


  // take country options from api
  getCountriesOptions() {
    this.apiService.getCountries().subscribe((data) => {
      this.countries = data;
      console.log(this.countries);
    });
  }
  // funcion para seleccionar avatar
  toggleAvatar(avatar: Avatar) {
    avatar.selected = !avatar.selected;
    this.selectedAvatar = avatar;
    console.log(this.selectedAvatar);
  }

  // verifica si el avatar es seleccionado
  avatarIsSelected(avatar: Avatar) {
    if (avatar.selected) {
      this.selectedAvatar = avatar;
    }
  }

  onSubmit() {
    const userData = {
      ...this.formProfile.value,
      skills: this.KnownSkills.map(skill => skill.id),
      interests: this.SkillsToLearn. map(skill => skill.id)
    }
    console.log('Datos de actualización:', userData);
    this.authService.updateUser(userData).subscribe({
      next: () => {
        console.log('Datos actualizados');
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
