import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/Category';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  notifications: number = 0;
  // Diccionario con las categorías
  categories = [
    { name: "Idiomas", description: "¡Aprende a hablar al máximo!" },
    { name: "Tecnología", description: "¡Perfecto para aprender a programar!" },
    { name: "Marketing", description: "¿Te apetece montar tu empresa?" },
    { name: "Música", description: "¡Aprende lo que hacen tus artistas favoritos!" }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();

    this.authService.loggedIn$.subscribe((state) =>{
      this.isLoggedIn = state;
    })

    this.chatService.unReadCountTotal$.subscribe((data) => {
      this.notifications = data;
      console.log('total unread', data);
    });
  }

  goToExploreWithCategory(categoryName: string) {
    this.router.navigate(['dashboard/explorar/categoria', categoryName],
    )
  }

  logout() {
    this.authService.logout();
  }





}
