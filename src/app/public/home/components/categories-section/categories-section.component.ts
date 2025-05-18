import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Category } from 'src/app/core/models/Category';

@Component({
  selector: 'app-categories-section',
  templateUrl: './categories-section.component.html',
})
export class CategoriesSectionComponent implements OnInit {
  constructor(private apiService: ApiService) { }


  categories: Category[] = [];

  ngOnInit(): void {
    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getColor(icon: string) {
    switch (icon) {
      case '🗣️':
        return 'bg-blue-50';
      case '🎨':
        return 'bg-red-50';
      case '🎵':
        return 'bg-blue-50';
      case '🍳':
        return 'bg-yellow-50';
      case '📚':
        return 'bg-blue-50';
      case '❤️‍🩹':
        return 'bg-green-50';
      case '💻':
        return 'bg-gray-50';
      case '📣':
        return 'bg-purple-50';
      default:
        return '';
    }
  }
}
