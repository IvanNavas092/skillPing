import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ProyectoTfg_A16_v2';

  constructor(private auth: AuthService, private http : HttpClient) {
  }


  ngOnInit(): void {
    this.http.get<{ csrfToken: string }>('api/get-csrf-token/', { withCredentials: true })
  .subscribe(res => sessionStorage.setItem('csrfToken', res.csrfToken));


    this.auth.checkSession().subscribe({
      next: () => {},
      error: (error) => {
        console.log('No esta logueado');
      }
    });
    AOS.init();
  }
}
