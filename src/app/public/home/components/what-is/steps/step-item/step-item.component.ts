import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-item',
  templateUrl: './step-item.component.html',
})
export class StepItemComponent {
  @Input() number: number = 1;
  @Input() title: string = '';
  @Input() description: string = '';
}
