import { Component, HostListener, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
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
  isMobile!: boolean;

  categories = [
    { name: "Idiomas", description: "¡Aprende a hablar al máximo, tú puedes!" },
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
    // Check if user is logged in
    this.authService.isLoggedIn$.subscribe(flag => {
      this.isLoggedIn = flag;
      // if is logged in, refresh unread counts for chatService integrate 
      if (flag) {
        this.chatService.refreshUnreadCounts();
      }
      console.log('Header: isLoggedIn=', flag);
    });

    this.checkWindowSize();


    this.chatService.unReadCountTotal$.subscribe((data) => {
      this.notifications = data;
      console.log('total unread', data);
    });

    console.log(this.isLoggedIn.valueOf());
  }

  goToExploreWithCategory(categoryName: string) {
    this.router.navigate(['/dashboard/explorar/categoria', categoryName],
    )
  }

  // Escucha cambios de tamaño de la ventana
  @HostListener('window:resize', [])
  onResize() {
    this.checkWindowSize();
  }

  private checkWindowSize(): void {
    this.isMobile = window.innerWidth <= 768;
  }







}
