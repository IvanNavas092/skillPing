import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-step-skills',
  templateUrl: './step-skills.component.html',
  styles: [
  ]
})
export class StepSkillsComponent {
  // inputs
  @Input() title = '';
  @Input() subtitle = '';
  @Input() skills: any[] = [];
  @Input() selected: number[] = [];
  @Input() disabledItems: number[] = [];
  @Input() errorMessage = '';

  // emit toggle event
  @Output() toggle = new EventEmitter<number>();
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  // function auxiliar for emit toggle event
  onSkillClick(id: number) {
    this.toggle.emit(id);
  }
}
