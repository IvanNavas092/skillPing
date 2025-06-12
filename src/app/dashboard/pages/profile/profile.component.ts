import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Avatar } from 'src/app/core/models/avatar';
import { Country } from 'src/app/core/models/Country';
import { Skill } from 'src/app/core/models/skill';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AvatarService } from 'src/app/core/services/avatar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  storage = sessionStorage;
  avatars: Avatar[] = [];
  user!: User;
  formProfile!: FormGroup;
  countries: Country[] = [];
  genderOptions = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
    { value: 'O', label: 'Otro' }
  ];
  selectedAvatar?: number;

  KnownSkills: Skill[] = [];
  SkillsToLearn: Skill[] = [];
  allSkills: Skill[] = [];

  formFields = [
    { id: 1, label: 'Nombre completo', controlName: 'full_name', type: 'text', placeholder: 'Nombre Apellido' },
    { id: 2, label: 'Nombre de usuario', controlName: 'username', type: 'text', placeholder: 'ejemplo01' },
    { id: 3, label: 'Email', controlName: 'email', type: 'email', placeholder: 'ejemplo@gmail.com' },
    { id: 4, label: 'Contraseña', controlName: 'password', type: 'password', placeholder: '********', },
    { id: 5, label: 'Edad', controlName: 'age', type: 'number', placeholder: 'Ejemplo: 25' },
    { id: 6, label: 'Localidad', controlName: 'location', type: 'select', placeholder: 'Selecciona una opción' },
    { id: 7, label: 'Género', controlName: 'gender', type: 'select', placeholder: 'Ejemplo: Masculino' },
    { id: 8, label: 'Descripción', controlName: 'description', type: 'text', placeholder: 'Ejemplo: Soy un usuario' },
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private avatarService: AvatarService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.avatars = this.avatarService.getAvatars();
    this.buildForm();
    this.getCountriesOptions();
    this.getSkills();
    this.getSkillsUser(this.user);
  }

  buildForm() {
    this.formProfile = this.fb.group({
      full_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [{ value: '', disabled: true }],
      age: ['', Validators.required],
      location: ['', Validators.required],
      gender: ['', Validators.required],
      description: [''],
      selectedSkillHabilidades: [''],
      selectedSkillIntereses: ['']
    });
    const { password, ...rest } = this.user;
    this.formProfile.patchValue(rest);
  }

  updateDataUser(user: User) {
    this.user = user;
    this.storage.setItem('auth-user', JSON.stringify(user));
  }

  getCountriesOptions() {
    this.apiService.getCountries().subscribe((data: Country[]) => {
      this.countries = data;
    });
  }

  getSkills() {
    this.apiService.getSkills().subscribe((data: Skill[]) => {
      this.allSkills = data.filter(skill =>
        !this.KnownSkills.some(k => k.id === skill.id) &&
        !this.SkillsToLearn.some(l => l.id === skill.id)
      );
    });
  }

  getSkillsUser(user: any) {
    if (user.skills_details && user.skills_details.length > 0) {
      this.KnownSkills = [...user.skills_details];
    }
    if (user.interests_details && user.interests_details.length > 0) {
      this.SkillsToLearn = [...user.interests_details];
    }
  }

  toggleAvatar(avatarId: number) {
    this.selectedAvatar = avatarId;
  }

  addSkill(list: 'known' | 'toLearn') {
    const control = list === 'known' ? 'selectedSkillHabilidades' : 'selectedSkillIntereses';
    const selected = this.formProfile.get(control)?.value;
    if (!selected) return;

    if (list === 'known' && !this.KnownSkills.some(s => s.id === selected.id)) {
      this.KnownSkills.push(selected);
    } else if (list === 'toLearn' && !this.SkillsToLearn.some(s => s.id === selected.id)) {
      this.SkillsToLearn.push(selected);
    }
  }

  removeSkill(skill: Skill, list: 'known' | 'toLearn') {
    if (list === 'known') {
      this.KnownSkills = this.KnownSkills.filter(s => s.id !== skill.id);
    } else {
      this.SkillsToLearn = this.SkillsToLearn.filter(s => s.id !== skill.id);
    }
  }

  onSubmit() {
    Swal.fire({
      title: '¿Guardar cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg',
        cancelButton: 'bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg ml-2'
      },
    }).then(result => {
      if (result.isConfirmed) {
        const data = this.formProfile.value;
        const userData = {
          full_name: data.full_name,
          username: data.username,
          email: data.email,
          age: data.age,
          location: data.location,
          gender: data.gender,
          description: data.description,
          avatar: this.selectedAvatar,
          skills: this.KnownSkills,
          interests: this.SkillsToLearn
        };

        this.authService.updateUser(this.user.id, userData).subscribe({
          next: updated => {
            this.updateDataUser(updated);
            Swal.fire({
              title: '¡Perfil actualizado!',
              icon: 'success',
              timer: 3000,
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg',
              }
            });
          },
          error: () => {
            Swal.fire({ title: 'Error al actualizar', icon: 'error' });
          }
        });
      }
    });
  }
}
