import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-basic',
  templateUrl: './step-basic.component.html',
  styleUrls: ['../../../style/styles_login_register.css']
})
export class StepBasicComponent {
  @Input() registerForm!: FormGroup;
  @Input() fields: any[] = [];
  @Output() next = new EventEmitter<void>();

}
