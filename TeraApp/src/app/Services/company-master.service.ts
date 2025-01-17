import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyMaster } from '../../../Models/type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyMasterService {
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

  getAllCompaniesList(pageNo: number, pageSize: number): Observable<CompanyMaster[]> {
    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<CompanyMaster[]>(`${this.baseUrl}/company/GetCompanyList`,  { params, headers: this.getAuthHeaders() });
  }

  getCompanyById(id: number): Observable<CompanyMaster> {
    return this.http.get<CompanyMaster>(`${this.baseUrl}/company/${id}`, { headers: this.getAuthHeaders() });
  }

  saveCompany(company: CompanyMaster): Observable<CompanyMaster> {
    return this.http.post<CompanyMaster>(
      `${this.baseUrl}/company`,
        company,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/company/${id}`, { headers: this.getAuthHeaders() });
  }
}
