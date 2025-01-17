import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyMaster, FinancialYearMaster } from '../../../Models/type';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListOfValueService {

  private baseUrl = 'http://localhost:5266/api';
 
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve JWT from local storage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllCompanies(): Observable<CompanyMaster[]> {
    return this.http.get<CompanyMaster[]>(`${this.baseUrl}/company`, { headers: this.getAuthHeaders() });
  }

  getAllFinancialYears(): Observable<FinancialYearMaster[]> {
    return this.http.get<FinancialYearMaster[]>(`${this.baseUrl}/GetFinancialYearsAll`,  {  headers: this.getAuthHeaders() });
  }

}
