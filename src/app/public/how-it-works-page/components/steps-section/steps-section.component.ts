import { Component } from '@angular/core';

@Component({
  selector: 'app-steps-section',
  templateUrl: './steps-section.component.html',
})
export class StepsSectionComponent {
    steps = [
    { number: "01", title: "Busca habilidades", description: "Encuentra personas dispuestas a compartir sus conocimientos en una amplia variedad de disciplinas."},
    { number: "02", title: "Conecta con otros", description: "Conoce personas con intereses similares y complementa tus habilidades con las suyas."},
    { number: "03", title: "Coordina intercambios", description: "Utiliza nuestro sistema de chat para organizar los detalles del intercambio de habilidades."},
    { number: "04", title: "Aprende y enseña", description: "Comparte lo que sabes y adquiere nuevos conocimientos sin costos económicos."},
  ]

}
