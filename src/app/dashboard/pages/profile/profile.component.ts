import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Avatar } from 'src/app/core/models/avatar';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';
import { Skill } from 'src/app/core/models/skill';
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
  countries: string[] = [];

  // User skills
  KnownSkills: Skill[] = [];
  SkillsToLearn: Skill[] = [];
  allSkills: Skill[] = [];

  // avatars
  selectedAvatar: number | undefined;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
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
    { id: 7, label: 'género', controlName: 'gender', type: 'select', placeholder: 'Ejemplo: Masculino' },
    { id: 8, label: 'Descripción', controlName: 'description', type: 'text', placeholder: 'Ejemplo: Soy un usuario', },
  ]

  selectFields = [
    { label: 'Habilidades', controlName: 'selectedSkillHabilidades' },
    { label: 'Intereses', controlName: 'selectedSkillIntereses' },
  ]
  // genders choices
  genderOptions = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
    { value: 'O', label: 'Otro' }
  ];

  ngOnInit(): void {
    // take user from sessionStorage
    this.user = this.authService.getCurrentUser();
    // take avatars from avatarService
    this.avatars = this.avatarService.getAvatars();

    this.formProfile = this.fb.group({
      full_name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: [{ value: '', disabled: true },],
      age: ['', Validators.required],
      location: ['',Validators.required],
      gender: ['', Validators.required],
      description: ['', Validators.minLength(10)],
      selectedSkillHabilidades: [''],
      selectedSkillIntereses: [''],
    })
    this.getCountriesOptions();
    this.patchForm(this.user);
    this.getSkills();
    this.getSkillsUser(this.user);

    console.log(this.countries);

  }

  patchForm(user: User) {
    console.log('user before patch:', this.user);

    this.formProfile.patchValue(user);

    
  }

  // update user data in sessionStorage
  updateDataUser(user: User) {
    this.user = user;
    this.storage.setItem('auth-user', JSON.stringify(user));
  }

  getSkills() {
    this.apiService.getSkills().subscribe((data: Skill[]) => {
      this.allSkills = data.filter(skill =>
        !this.KnownSkills.some(known => known.id === skill.id)
        && !this.SkillsToLearn.some(toLearn => toLearn.id === skill.id))
    });
  }

  addSkill(list: 'known' | 'toLearn') {
    const controlName = list === 'known' ? 'selectedSkillHabilidades' : 'selectedSkillIntereses';
    const selectedSkill = this.formProfile.get(controlName)?.value;
    console.log(selectedSkill);

    if (!selectedSkill) return;

    if (list === 'known' && !this.KnownSkills.some(s => s.id === selectedSkill.id))
      this.KnownSkills.push(selectedSkill);
    else if (list === 'toLearn' && !this.SkillsToLearn.some(s => s.id === selectedSkill.id))
      this.SkillsToLearn.push(selectedSkill);

    console.log('Known', this.KnownSkills, 'toLearn', this.SkillsToLearn);
  }

  removeSkill(skillToRemove: Skill, list: 'known' | 'toLearn') {
    if (list === 'known')
      this.KnownSkills = this.KnownSkills.filter(skill => skill.id !== skillToRemove.id);
    else if (list === 'toLearn')
      this.SkillsToLearn = this.SkillsToLearn.filter(skill => skill.id !== skillToRemove.id);

    console.log('known', this.KnownSkills, 'toLearn', this.SkillsToLearn);
  }

  getSkillsUser(user: User) {
    if (this.user.skills.length > 0) {
      this.KnownSkills = user.skills.map(skill => skill)
    }
    if (this.user.interests.length > 0) {
      this.SkillsToLearn = user.interests.map(skill => skill)
    }
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
    this.selectedAvatar = avatar.id;
    console.log(this.selectedAvatar);
  }

  // verifica si el avatar es seleccionado
  avatarIsSelected(avatar: Avatar) {
    if (avatar.selected) {
      this.selectedAvatar = avatar.id;
    }
  }

  onSubmit() {
    // first ask if the user wants to save the changes
    Swal.fire({
      title: '¿Guardar cambios?',
      text: '¿Estás seguro de que quieres actualizar tu perfil?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: '!bg-blue-600 hover:!bg-blue-700 !text-white !font-medium !py-2 !px-4 !rounded-lg',
        cancelButton: '!bg-gray-200 hover:!bg-gray-300 !text-gray-800 !font-medium !py-2 !px-4 !rounded-lg !ml-2'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.formProfile.value;
        // if the user confirm, update the user
        const userData = {
          full_name: formData.full_name,
          username: formData.username,
          email: formData.email,
          age: formData.age,
          location: formData.location,
          gender: formData.gender,
          description: formData.description,
          avatar: this.selectedAvatar,
          skills: this.KnownSkills,
          interests: this.SkillsToLearn,
        };

        this.authService.updateUser(this.user.id, userData).subscribe({
          next: (updatedUser) => {
            this.user = updatedUser;
            this.updateDataUser(this.user);
            // Modal de éxito
            Swal.fire({
              title: '¡Perfil actualizado!',
              text: 'Tus cambios se guardaron correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              timer: 3000,  // auto close in 3 seconds
              timerProgressBar: true,
              customClass: {
                confirmButton: '!bg-blue-600 hover:!bg-blue-700 !text-white !font-medium !py-2 !px-4 !rounded-lg',
              },
            });
          },
          error: (error) => {
            console.error('Error:', error);
            // Error modal
            Swal.fire({
              title: 'Algo salió mal',
              text: 'No se pudieron actualizar los datos del perfil',
              icon: 'error',
              confirmButtonText: 'Entendido',
              customClass: {
                confirmButton: '!bg-blue-600 hover:!bg-blue-700 !text-white !font-medium !py-2 !px-4 !rounded-lg',
              },
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // if the user cancels, do nothing
        Swal.fire({
          title: 'Cancelado',
          text: 'Tus cambios no se han guardado',
          icon: 'info',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
}
