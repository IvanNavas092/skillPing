import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ProyectoTfg_A16_v2';

  constructor(private http: HttpClient) { }

  apiUrl = "https://skillping-server.onrender.com/api/";

  ngOnInit(): void {
    this.http
      .get<{ csrfToken: string }>(`${this.apiUrl}get-csrf-token/`, {
        withCredentials: true,
      })
      .subscribe({
        next: res => {
          // save the token in sessionStorage
          sessionStorage.setItem('csrfToken', res.csrfToken);
        },
        error: err => console.error('No pude obtener CSRF token', err),
      });
    AOS.init();
  }
}
