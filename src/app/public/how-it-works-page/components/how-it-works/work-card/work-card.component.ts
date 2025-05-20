import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-works-card',
  templateUrl: './work-card.component.html',
})
export class WorksCardComponent {
  @Input() section: any; 
}
