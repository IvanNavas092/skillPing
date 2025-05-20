import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-card',
  templateUrl: './step-card.component.html',
})
export class StepCardComponent {
  @Input() step: any;
}
