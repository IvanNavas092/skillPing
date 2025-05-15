import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-results-rating',
  templateUrl: './card-results-rating.component.html',
})
export class CardResultsRatingComponent {
  @Input() user!: any;
}
