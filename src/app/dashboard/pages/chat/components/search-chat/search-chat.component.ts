import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-chat',
  templateUrl: './search-chat.component.html',
})
export class SearchChatComponent {
  @Output() searchChange = new EventEmitter<string>();
  
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }


}
