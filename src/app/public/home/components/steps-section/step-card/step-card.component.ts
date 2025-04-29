import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.css']
})
export class StepCardComponent {
  @Input() step: any;

}
