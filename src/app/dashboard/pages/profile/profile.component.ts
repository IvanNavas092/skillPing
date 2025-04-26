import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Avatar } from 'src/app/core/models/avatar';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';
import { Skill } from 'src/app/core/models/skill';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  avatars: Avatar[] = [];
  user!: User;
  formProfile!: FormGroup;

  // User skills
  KnownSkills : any[] = [];
  SkillsToLearn : any[] = [];

  // avatars
  selectedAvatar: Avatar | undefined;

  constructor(private fb: FormBuilder, private apiService: ApiService) { }
  allSkills: Skill[] = [];

  getSkills() {
    this.apiService.getSkills().subscribe((data) => {
      this.allSkills = data;
    });
  }

  // lista de fields con validations
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
        { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
      ]
    },
    {
      id: 'email', label: 'Email', controlName: 'email', type: 'email', placeholder: 'ejemplo@gmail.com',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
      ]
    },
    {
      id: 'password', label: 'Contraseña', controlName: 'password', type: 'password', placeholder: '********',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
      ]
    },
    {
      id: 'edad', label: 'Edad', controlName: 'edad', type: 'number', placeholder: 'Ejemplo: 25',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
      ]
    },
    {
      id: 'disponibilidad', label: 'Disponibilidad', controlName: 'disponibilidad', type: 'text', placeholder: 'Ejemplo: Disponible',
      validations: [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
      ]
    },
    { id: 'sexo', label: 'Sexo', controlName: 'sexo', type: 'text', placeholder: 'Ejemplo: Masculino' },
    { id: 'description', label: 'Descripción', controlName: 'description', type: 'text', placeholder: 'Ejemplo: Soy un usuario', },
  ]
  
  selectFields =[
    { label: 'Habilidades' },
    { label: 'Intereses' },
    
  ]




  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('auth-user') || '{}');

    this.avatars = [
      { id: 1, name: 'Héctor', img: '/assets/avatar/man_avatar_1.png', selected: false },
      { id: 2, name: 'Manuel', img: '/assets/avatar/man_avatar_2.png', selected: false },
      { id: 3, name: 'Ana', img: '/assets/avatar/woman_avatar_3.png', selected: false },
      { id: 4, name: 'Ingrid', img: '/assets/avatar/woman_avatar_2.png', selected: false },
    ]

    this.formProfile = this.fb.group({
      full_name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      edad: ['', Validators.required],
      disponibilidad: ['', Validators.required],
      sexo: ['', Validators.required],
      description: ['', Validators.required],
      skills: ['', Validators.required],
      interests: ['', Validators.required]
      
    })
    this.patchForm(this.user);
    this.getSkills(); 
    this.getSkillsUser(this.user);

  }

  patchForm(user: User) {
    this.formProfile.patchValue(user);
  }

  getSkillsUser(user: User) {
    if (this.user.skills.length > 0) {
      this.KnownSkills = user.skills.map(skill => skill.name)
      console.log(this.KnownSkills);
    }
    if (this.user.interests.length > 0) {
      this.SkillsToLearn = user.interests.map(skill => skill.name)
      console.log(this.SkillsToLearn);
    }
    console.log('aprender', this.KnownSkills,'enseñar', this.SkillsToLearn);
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
    console.log('Datos de perfil:', this.formProfile.value);
  }



}
