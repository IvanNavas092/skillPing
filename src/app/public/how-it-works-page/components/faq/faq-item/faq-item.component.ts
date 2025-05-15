import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
})
export class FaqItemComponent {
  @Input() question: string = '';
  @Input() answer: string = '';
  @Input() itemId: number = 0;
  isOpen: boolean = false;

  toggleAccordion() {
    this.isOpen = !this.isOpen;
  }

}
