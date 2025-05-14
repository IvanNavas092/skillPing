import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-works',
  templateUrl: './hero-works.component.html',
})
export class HeroWorksComponent {
  lists = [
    { title: "Enseña tus conocimientos", description: "Comparte todo lo que sabes!" },
    { title: "Recibe a cambio", description: "Clases de cocina, música, arte..." },
    { title: "¡Sin costos!", description: "Solo intercambio de conocimientos!" },
  ]
}
