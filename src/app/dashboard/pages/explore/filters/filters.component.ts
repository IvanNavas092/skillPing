import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/core/models/Category';
import { ApiService } from 'src/app/core/services/api.service';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  constructor(private apiService: ApiService) { }

  selectedFilter: Category | null = null;
  categories: any[] = [];

  @Output() categorieActive = new EventEmitter<string | null>();


  ngOnInit(): void {
    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  toggleFilter(category: Category) {
    if (this.selectedFilter === category) {
      this.selectedFilter = null;
      this.categorieActive.emit(null);
    }
    else {
      this.selectedFilter = category;
      this.categorieActive.emit(category.name);
    }
  }

}
