import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { AvatarService } from 'src/app/core/services/avatar.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent  {
  @Input() user!: User;

  constructor(private avatarService: AvatarService, private router: Router) { }


  getAvatar() {
    return this.avatarService.getAvatarById(this.user.avatar);
  }

  navigateToUserDetail() {
    this.router.navigate(['dashboard/explorar/usuario/' + this.user.id]);
  }
  
}
