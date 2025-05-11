import { Component, Input } from '@angular/core';
import { Rating } from 'src/app/core/models/rating';
import { ApiService } from 'src/app/core/services/api.service';
import { AvatarService } from 'src/app/core/services/avatar.service';

@Component({
  selector: 'app-rating-card',
  templateUrl: './rating-card.component.html',
  styleUrls: ['./rating-card.component.css']
})
export class RatingCardComponent {
  @Input() clickedUserId!: number;
  ratings: Rating[] = [];
  constructor(private apiService: ApiService, private avatarService: AvatarService) { }

  ngOnInit(): void {
    console.log(this.clickedUserId);
    this.getRatings();
  }

  getRatings() {
    if (!this.clickedUserId) {
      console.error('ID no definido');
      return;
    }
    this.apiService.getRatingsByUser(this.clickedUserId).subscribe({
      next: (data: Rating[]) => {
        console.log('Ratings recibidos:', data);
        this.ratings = data;
      },
      error: (err) => {
        console.error('Error al obtener ratings:', err);
      }
    });
  }
  
  

  getAvatar(ratingAvatarId: number) {
    return this.avatarService.getAvatarById(ratingAvatarId);
  }

}
