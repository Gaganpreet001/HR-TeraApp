import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinancialYearMaster } from '../../../Models/type';

@Injectable({
  providedIn: 'root'
})
export class FinancialYearMasterService {

  private baseUrl = "http://localhost:5266/api";

  constructor(private http: HttpClient) { } 
  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve JWT from local storage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllFinancialYears(pageNo: number, pageSize: number): Observable<FinancialYearMaster[]> {
    const params = new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString());
    return this.http.get<FinancialYearMaster[]>(`${this.baseUrl}/GetAllFinancialYears`,  { params, headers: this.getAuthHeaders() });
  }

  getFinancialYearById(id: number): Observable<FinancialYearMaster> {
    return this.http.get<FinancialYearMaster>(`${this.baseUrl}/GetFinancialYearById/${id}`,  { headers: this.getAuthHeaders() });
  }

  saveFinancialYear(financialYear: FinancialYearMaster): Observable<FinancialYearMaster> {
    return this.http.post<FinancialYearMaster>( `${this.baseUrl}/SaveFinancialYear`,  financialYear,  { headers: this.getAuthHeaders() } );
  }

  deleteFinancialYear(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteFinancialYear/${id}`,  { headers: this.getAuthHeaders() });
  }
}
