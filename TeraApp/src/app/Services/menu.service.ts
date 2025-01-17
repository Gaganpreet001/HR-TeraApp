import { Injectable } from '@angular/core';
import { MenuMaster } from '../../../Models/type';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl = "http://localhost:5266/api";

  constructor(private http: HttpClient) { } 
  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve JWT from local storage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllMenusList(pageNo: number, pageSize: number): Observable<MenuMaster[]> {
    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<MenuMaster[]>(`${this.baseUrl}/GetMenuList`,  { params, headers: this.getAuthHeaders() });
  }
  
  getAllMenus(): Observable<MenuMaster[]> {
    return this.http.get<MenuMaster[]>(`${this.baseUrl}/GetAllMenus`, { headers: this.getAuthHeaders() });
  }

  getMenuById(id: number): Observable<MenuMaster> {
    return this.http.get<MenuMaster>(`${this.baseUrl}/GetMenuById/${id}`,  { headers: this.getAuthHeaders() });
  }
  saveMenu(role: MenuMaster): Observable<MenuMaster> {
    return this.http.post<MenuMaster>( `${this.baseUrl}/SaveMenu`,  role,  { headers: this.getAuthHeaders() } );
  }
  deleteMenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteMenu/${id}`,  { headers: this.getAuthHeaders() });
  }
}
