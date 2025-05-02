import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  search: string = '';
  @Output() searchChange = new EventEmitter<string>();

  onSearch(search: string) {
    this.searchChange.emit(search.trim());
    console.log(search);
  }
}
