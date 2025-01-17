import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleMaster } from '../../../Models/type';

@Injectable({
  providedIn: 'root'
})
export class RoleMasterService {
  private baseUrl = "http://localhost:5266/api";

  constructor(private http: HttpClient) { } 
  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve JWT from local storage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllRoles(pageNo: number, pageSize: number): Observable<RoleMaster[]> {
    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<RoleMaster[]>(`${this.baseUrl}/GetAllRoles`,  { params, headers: this.getAuthHeaders() });
  }

  getRoleById(id: number): Observable<RoleMaster> {
    return this.http.get<RoleMaster>(`${this.baseUrl}/GetRoleById/${id}`,  { headers: this.getAuthHeaders() });
  }
  saveRole(role: RoleMaster): Observable<RoleMaster> {
    return this.http.post<RoleMaster>( `${this.baseUrl}/SaveRole`,  role,  { headers: this.getAuthHeaders() } );
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteRole/${id}`,  { headers: this.getAuthHeaders() });
  }
}
