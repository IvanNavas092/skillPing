import { HttpClient } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    // Primero obtenemos el CSRF token
    this.http.get<{ csrfToken: string }>(`${this.apiUrl}get-csrf-token/`, { withCredentials: true })
      .subscribe({
        next: (res) => {
          sessionStorage.setItem('csrfToken', res.csrfToken);

          // Luego comprobamos la sesión (una vez que el token ya está guardado)
          this.auth.checkSession().subscribe({
            next: () => {},
            error: (error) => {
              console.log('No está logueado');
            }
          });
        },
        error: (err) => {
          console.error('Error al obtener CSRF token', err);
        }
      });

    // Inicializa animaciones
    AOS.init();
  }
}
