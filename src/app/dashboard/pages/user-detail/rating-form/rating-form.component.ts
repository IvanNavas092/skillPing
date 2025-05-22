import { Component, Input } from '@angular/core';
import { RatingPayload } from 'src/app/core/models/rating';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent {
  @Input() ratedUserId!: number; //rated userId
  comment!: string; // comment
  rating: number = 0; // rating
  ratingUserId!: number;

  errorMessage: string = '';


  constructor(
    private AuthService: AuthService,
    private apiService: ApiService,

  ) { }




  onSubmit() {
    // rating validation
    if (this.rating === 0) {
      this.errorMessage = "Por favor selecciona una valoración entre 1 y 5 estrellas";
      return;
    }

    // comment validation
    if (!this.comment || this.comment.trim().length < 10) {
      this.errorMessage = "El comentario debe tener al menos 10 caracteres";
      return;
    }

    // clean messagges
    this.errorMessage = '';

    // obtain id of current user
    this.ratingUserId = this.AuthService.getCurrentUserId();

    // prepare data for rating
    const dataRating = {
      rating_user: this.ratingUserId,
      rated_user: this.ratedUserId,
      comment: this.comment.trim(), // Limpiar espacios en blanco
      value: this.rating
    };

    console.log('Enviando rating:', dataRating);

    // send to service
    this.apiService.setRating(dataRating).subscribe({
      next: (data: RatingPayload) => {
        console.log('Rating recibido:', data);
        Swal.fire({
          icon: 'success',
          title: 'Valoración enviada',
          text: '¡Gracias por tu valoración!',
          showCancelButton: false,
          customClass: {
              confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg',
            },
        })
        // Opcional: resetear el formulario
        this.rating = 0;
        this.comment = '';
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  handleError(error: any) {
    if (error.error) {
      // error from server
      if (error.error.non_field_errors) {
        this.errorMessage = "No puedes valorar al mismo usuario 2 veces!";  
      } else if (error.status === 400) {
        this.errorMessage = "Datos inválidos: " + Object.values(error.error).join(', ');
      } else {
        this.errorMessage = "Algo salió mal, intenta de nuevo más tarde";
      }
    }
    else {
      this.errorMessage = 'Error de conexión con el servidor';
    }
  }

}
