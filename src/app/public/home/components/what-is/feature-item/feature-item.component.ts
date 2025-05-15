import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-item',
  templateUrl: './feature-item.component.html',
  styles: [
  ]
})
export class FeatureItemComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';

}
