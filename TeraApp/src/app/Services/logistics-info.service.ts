import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogisticsInfo } from '../../../Models/type';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogisticsInfoService {

  private baseUrl = "http://localhost:5266/api"; 
  //private baseUrl = "http://localhost:1212/api";   // Remote Changed 

  constructor(private http: HttpClient) { } 

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve JWT from local storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllLogisticsInfos(): Observable<LogisticsInfo[]> {
    return this.http.get<LogisticsInfo[]>(`${this.baseUrl}/LogisticsInfo`, { headers: this.getAuthHeaders() });
  }
  // Get info by Id
  getLogisticsInfoById(id: number): Observable<LogisticsInfo> {
    return this.http.get<LogisticsInfo>(`${this.baseUrl}/LogisticsInfo/${id}`, { headers: this.getAuthHeaders() });
  }
  // Add new info
  addNewLogisticsInfo(newLogisticsInfo: LogisticsInfo): Observable<LogisticsInfo> {
    return this.http.post<LogisticsInfo>(`${this.baseUrl}/LogisticsInfo`, newLogisticsInfo, { headers: this.getAuthHeaders() });
  }
  // Add new info
  saveLogisticsInfo(logisticsInfo: LogisticsInfo): Observable<LogisticsInfo> {
    return this.http.post<LogisticsInfo>(`${this.baseUrl}/LogisticsInfo/save`, logisticsInfo, { headers: this.getAuthHeaders() });
  }
  // Update an existing info
  updateLogisticsInfo(updatedLogisticsInfo: LogisticsInfo, id: number): Observable<LogisticsInfo> {
    return this.http.put<LogisticsInfo>(`${this.baseUrl}/LogisticsInfo/${id}`, updatedLogisticsInfo, { headers: this.getAuthHeaders() });
  }
  // Delete an  info by Id
  deleteLogisticsInfo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/LogisticsInfo/${id}`, { headers: this.getAuthHeaders() });
  }
}
