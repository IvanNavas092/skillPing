import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroHomeComponent {

  constructor() { }


  lists = [
    { title: "Enseña tus conocimientos", description: "Comparte todo lo que sabes!" },
    { title: "Recibe a cambio", description: "Clases de cocina, música, arte..." },
    { title: "¡Sin costos!", description: "Solo intercambio de conocimientos!" },
  ]

}
