import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
})
export class FaqComponent {
    faqItems = [
    {
      id: 1,
      question: '¿Es completamente gratis usar SkillPing?',
      answer: 'Sí, SkillPing es completamente gratuito. No cobramos por registrarte ni por realizar intercambios de habilidades.'
    },
    {
      id: 2,
      question: '¿Cómo me aseguro de que el intercambio sea equitativo?',
      answer: 'SkillPing tiene un sistema de valoración donde ambas partes pueden acordar el tiempo y complejidad del intercambio.'
    },
    {
      id: 3,
      question: '¿Qué habilidades puedo intercambiar?',
      answer: 'Puedes intercambiar cualquier habilidad que tenga valor para otros usuarios.'
    },
    {
      id: 4,
      question: '¿Cómo se realizan los intercambios?',
      answer: 'Los intercambios se acuerdan entre los usuarios. Pueden ser presenciales o virtuales.'
    },
    {
      id: 5,
      question: '¿Puedo intercambiar más de una habilidad a la vez?',
      answer: 'Sí, puedes acordar intercambios múltiples con otros usuarios.'
    },
    {
      id: 6,
      question: '¿Existen requisitos mínimos para ofrecer una habilidad?',
      answer: 'El único requisito es que tengas conocimientos suficientes para enseñar o compartir la habilidad.'
    }
  ];

}
