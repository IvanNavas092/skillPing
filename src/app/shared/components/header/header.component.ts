import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // Diccionario con las categorías
  categories = [
    { name: "Pop", description: "Disfruta del Pop al máximo!" },
    { name: "Hip-Hop", description: "Siente el Hip-Hop como tú sabes!" },
    { name: "Rock", description: "Vida de rock como la canción de Milo J!" },
    { name: "Latino", description: "Descubre las últimas novedades!" }
  ];

  constructor() { }



}
