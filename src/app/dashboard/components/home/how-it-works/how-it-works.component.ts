import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent {
  sections = [
    {icon: "search", title: "Busca habilidades", description: "Encuentra personas dispuestas a compartir sus conocimientos en una amplia variedad de disciplinas."},
    {icon: "users", title: "Conecta con otros", description: "Conoce personas con intereses similares y complementa tus habilidades con las suyas."},
    {icon: "message-circle", title: "Coordina intercambios", description: "Utiliza nuestro sistema de chat para organizar los detalles del intercambio de habilidades."},
    {icon: "check-check", title: "Aprende y enseña", description: "Comparte lo que sabes y adquiere nuevos conocimientos sin costos económicos."},
  ]

}
