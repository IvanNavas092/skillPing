import { Component } from '@angular/core';

@Component({
  selector: 'app-steps-section',
  templateUrl: './steps-section.component.html',
})
export class StepsSectionComponent {
    steps = [
    { number: "01", title: "Crea tu perfil", description: "Rellena tu información, tus habilidades y tus objetivos de aprendizaje para que otros te encuentren fácilmente."},
    { number: "02", title: "Conecta con la comunidad", description: "Busca usuarios según tus intereses: elige a quienes quieres aprender y a quienes puedas enseñar."},
    { number: "03", title: "Aprende y comparte", description: "Participa en intercambios de conocimiento absorbiendo nuevos contenidos y aporta lo que sabes."},
    { number: "04", title: "Repite y crece", description: "Vuelve a buscar, ajusta tus metas y descubre nuevas personas y temas cada vez más avanzados."},

  ]

}
