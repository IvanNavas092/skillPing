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
    // get token from server
    this.http.get(`${this.apiUrl}get-csrf-token/`, { withCredentials: true })
      .subscribe({
        next: () => console.log('CSRF token set'),
        error: (err) => console.error('Error setting CSRF token', err)
      });
      // init AOS
      AOS.init();
  }
}
