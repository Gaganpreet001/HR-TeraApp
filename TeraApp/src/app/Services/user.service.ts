import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserMaster } from '../../../Models/type';
import { UserAEComponent } from '../pages/user-ae/user-ae.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:5266/api";

  constructor(private http: HttpClient) { } 
  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve JWT from local storage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getUserList(pageNo: number, pageSize: number): Observable<UserMaster[]> {
    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<UserMaster[]>(`${this.baseUrl}/GetUserList`,  { params, headers: this.getAuthHeaders() });
  }
    
  getAllUsers(): Observable<UserMaster[]> {
    return this.http.get<UserMaster[]>(`${this.baseUrl}/GetAllUsers`, { headers: this.getAuthHeaders() });
  }

  getUserById(id: number): Observable<UserMaster> {
    return this.http.get<UserMaster>(`${this.baseUrl}/GetUserById/${id}`,  { headers: this.getAuthHeaders() });
  }
  saveUser(user: UserMaster): Observable<UserMaster> {
    return this.http.post<UserMaster>( `${this.baseUrl}/SaveUser`,  user,  { headers: this.getAuthHeaders() } );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteUser/${id}`,  { headers: this.getAuthHeaders() });
  }
}
