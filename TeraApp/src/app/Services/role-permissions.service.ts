import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolePermissions } from '../../../Models/type';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionsService {

  private baseUrl = "http://localhost:5266/api";

  constructor(private http: HttpClient) { } 
  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve JWT from local storage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getPermissionsList(pageNo: number, pageSize: number): Observable<RolePermissions[]> {
    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<RolePermissions[]>(`${this.baseUrl}/GetPermissionsList`,  { params, headers: this.getAuthHeaders() });
  }
  
  getAllPermissions(): Observable<RolePermissions[]> {
    return this.http.get<RolePermissions[]>(`${this.baseUrl}/GetAllPermissions`, { headers: this.getAuthHeaders() });
  }

  getPermissionsByRoleId(roleId: number): Observable<RolePermissions[]> {
    const params = new HttpParams()
      .set('roleId', roleId.toString())
    return this.http.get<RolePermissions[]>(`${this.baseUrl}/GetRolePermissionByRoleId`,  { params, headers: this.getAuthHeaders() });
  }

  getPermissionById(id: number): Observable<RolePermissions> {
    return this.http.get<RolePermissions>(`${this.baseUrl}/GetPermissionById/${id}`,  { headers: this.getAuthHeaders() });
  }
  savePermission(permission: RolePermissions): Observable<RolePermissions> {
    return this.http.post<RolePermissions>( `${this.baseUrl}/SaveRolePermission`,  permission,  { headers: this.getAuthHeaders() } );
  }

  deletePermission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeletePermission/${id}`,  { headers: this.getAuthHeaders() });
  }
}
