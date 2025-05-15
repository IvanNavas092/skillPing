import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/models/Category';
import { ApiService } from 'src/app/core/services/api.service';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  activeCategoryFromRoute: string | null = '';

  constructor(private apiService: ApiService, private router: ActivatedRoute) { }

  selectedFilter: Category | null = null;
  categories: any[] = [];

  @Output() categorieActive = new EventEmitter<string | null>();


  ngOnInit(): void {
    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
      this.setupRouteListener();
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

  setupRouteListener(): void {
    this.router.paramMap.subscribe(params => {
      this.activeCategoryFromRoute = params.get('categoryName');
      console.log('Category from ROUTE -> ' + this.activeCategoryFromRoute);
      // if users are loaded, filter them
      if (this.activeCategoryFromRoute) {
        this.selectedFilter = this.categories.find(category => category.name === this.activeCategoryFromRoute);
        console.log('FILTER SELECTED ->', this.selectedFilter);
      }
    });
  }

}
