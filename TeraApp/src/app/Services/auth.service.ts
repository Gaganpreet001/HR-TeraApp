import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface LoginResponse {
  status: number;
  responsemsg: string;
  userid?: number;
  name?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5266/api/Login'; // Local Server
  //private apiUrl = "http://172.16.0.113:3645/api/Login";  // Remote Server
  //private apiUrl = "https://localhost:7107/api/Login";  // for loacl

  constructor(private http: HttpClient) {}
  sidebarOpen = true;
  login(username: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}?UserName=${username}&Password=${password}`;

    return this.http.post<LoginResponse>(url, null, { headers })
      .pipe(
        map(response => {
          if (response.status === 1 && response.token) {
            localStorage.setItem('token', response.token);
            console.log("Token Set") // Store JWT token
          }
          return response;
        }),
        catchError(error => {
          console.error('Login error:', error);
          throw error;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
