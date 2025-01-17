import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProformaService {

  private proformaUrl = "http://localhost:5266/api/Proforma";       // Local Server
  //private proformaUrl = "http://172.16.0.113:3645/api/Proforma";  // Remote IP
  //private proformaUrl = "http://localhost:1212/api/Proforma";     // Remote Server

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve JWT from local storage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getProformaPanelList( pageNo: number, pageSize: number, fromDate: string, toDate: string): Observable<any> {
    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('fromDate', fromDate)
      .set('toDate', toDate);
      
    return this.http.get<any>(`${this.proformaUrl}/GetProformaPanelList`, {
      params,
      headers: this.getAuthHeaders(),
    }); 
  }
}
