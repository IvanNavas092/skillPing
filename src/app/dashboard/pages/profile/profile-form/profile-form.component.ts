import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Country } from 'src/app/core/models/Country';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() formFields: any[] = [];
  @Input() countries: Country[] = [];
  @Input() genderOptions: any[] = [];

}
