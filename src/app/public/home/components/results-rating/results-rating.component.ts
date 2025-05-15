import { Component } from '@angular/core';

@Component({
  selector: 'app-results-rating',
  templateUrl: './results-rating.component.html',
})
export class ResultsRatingComponent {
  users = [
    {
      name: 'Lucía Sánchez',
      avatar: 'assets/avatar/woman_avatar_2.png',
      rating: 4,
      description: 'Gracias a SkillPing, aprendí a componer y ahora trabajo para artistas de un sello discográfico.',
      skills: ['Teoría musical', 'Composición', 'Instrumento']
    },
    {
      name: 'Carlos Gómez',
      avatar: 'assets/avatar/man_avatar_1.png',
      rating: 5,
      description: 'Intercambié conocimientos de desarrollo web y conseguí mi primer empleo como frontend.',
      skills: ['Programación', 'IoT', 'IA']
    },
    {
      name: 'Ana Torres',
      avatar: 'assets/avatar/woman_avatar_3.png',
      rating: 3,
      description: 'Ahora puedo ayudar a otros con mis habilidades en idiomas gracias a SkillPing.',
      skills: ['Inglés', 'Francés', 'Alemán']
    }
  ];
}
