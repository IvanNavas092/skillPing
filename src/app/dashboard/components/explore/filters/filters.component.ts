import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
@Component({
   selector: 'app-filters',
   templateUrl: './filters.component.html',
   styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
   constructor(private apiService: ApiService) { }
   FilterActive : any = null
   categories: any[] = [];

   ngOnInit(): void {
      this.apiService.getCategories().subscribe(data => {
         this.categories = data;
      });
   }

   toggleFilter(category: any) {
      category.status = !category.status;
      this.FilterActive = category;
      console.log(this.FilterActive);
   }

}
