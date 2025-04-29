import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-works-card',
  templateUrl: './works-card.component.html',
  styleUrls: ['./works-card.component.css']
})
export class WorksCardComponent {
  @Input() section: any; 

}
