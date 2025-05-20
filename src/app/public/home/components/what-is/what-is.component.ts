import { Component } from '@angular/core';

@Component({
  selector: 'app-what-is',
  templateUrl: './what-is.component.html',
})
export class WhatIsComponent {
  features = [
    {
      icon: '👥',
      title: 'Comunidad global',
      description: 'Usuarios de más de 30 países compartiendo conocimientos'
    },
    {
      icon: '📱',
      title: '150+ habilidades',
      description: 'Categorías desde programación hasta jardinería'
    }
  ];

  steps = [
    {
      number: 1,
      title: 'Registra tus habilidades',
      description: 'Indica qué puedes enseñar y qué te gustaría aprender'
    },
    {
      number: 2,
      title: 'Encuentra coincidencias',
      description: 'El sistema te muestra personas con las que podrías intercambiar conocimientos'
    },
    {
      number: 3,
      title: 'Establece el intercambio',
      description: 'Acuerda horarios, duración y formato de las sesiones'
    },
    {
      number: 4,
      title: 'Aprende y enseña',
      description: 'Comparte tu conocimiento y adquiere nuevas habilidades'
    }
  ];

}
