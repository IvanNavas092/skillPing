import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'fechaHora'
})
export class FechaHoraPipe implements PipeTransform {

  transform(value: Date | string): string {
    const fecha = new Date(value);
    const ahora = new Date();

    const esHoy = fecha.toDateString() === ahora.toDateString();

    const ayer = new Date();
    ayer.setDate(ahora.getDate() - 1);
    const esAyer = fecha.toDateString() === ayer.toDateString();

    const hora = formatDate(fecha, 'HH:mm', 'es-ES');

    if (esHoy) {
      return `Hoy a las ${hora}`;
    } else if (esAyer) {
      return `Ayer a las ${hora}`;
    } else {
      const diaSemana = formatDate(fecha, 'EEEE', 'es-ES'); // lunes, martes, etc.
      return `${this.capitalizar(diaSemana)} a las ${hora}`;
    }
  }

  private capitalizar(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
