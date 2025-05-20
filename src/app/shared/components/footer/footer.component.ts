import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  constructor(private router: Router) { }


  exploreCategories = [
    { name: "Idiomas"  },
    { name: "Tecnología" },
    { name: "Marketing" },
    { name: "Música" }
  ];
  goToExploreWithCategory(categoryName: string) {
    this.router.navigate(['/dashboard/explorar/categoria', categoryName],
    )
  }

  goToRatings() {
    // section has id="results-rating"
    this.router.navigate(['/'], { fragment: 'results-rating' });
  }

}
