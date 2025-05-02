import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/Category';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  // Diccionario con las categorías
  categories = [
    { name: "Idiomas", description: "¡Aprende a hablar al máximo!" },
    { name: "Tecnología", description: "¡Perfecto para aprender a programar!" },
    { name: "Marketing", description: "¿Te apetece montar tu empresa?" },
    { name: "Música", description: "¡Aprende lo que hacen tus artistas favoritos!" }
  ];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();

    this.authService.loggedIn$.subscribe((state) =>{
      this.isLoggedIn = state;
    })
  }

  goToExploreWithCategory(categoryName: string) {
    this.router.navigate(['dashboard/explorar/categoria', categoryName],
    )
  }

  logout() {
    this.authService.logout();
  }





}
