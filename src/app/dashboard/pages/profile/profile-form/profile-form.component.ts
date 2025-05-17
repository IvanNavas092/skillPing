import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() formFields: any[] = [];
  @Input() countries: string[] = [];
  @Input() genderOptions: any[] = [];

}
