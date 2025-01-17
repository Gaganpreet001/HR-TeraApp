import { Injectable } from '@angular/core';
import {
  GroupMaster,
  ItemMaster,
  UnitMaster,
  PartyMaster,
  SaleTypeMaster,
} from '../../../Models/type';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogisticsInfo } from '../../../Models/type';

@Injectable({
  providedIn: 'root',
})
export class LovService {

  private baseUrl = 'http://localhost:5266/api';
  private logisticsUrl = 'http://localhost:8084/api/logistics'; // Local Server
  //private logisticsUrl = "http://172.16.0.113:3645/api/logistics";  // Remote IP
  //private logisticsUrl = "http://localhost:1212/api/logistics";   // Remote Server

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve JWT from local storage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Method to get all UnitMasters
  getAllUnitMasters(): Observable<UnitMaster[]> {
    return this.http.get<UnitMaster[]>(`${this.baseUrl}/lov/units`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Method to get all GroupMasters
  getAllGroupMasters(): Observable<GroupMaster[]> {
    return this.http.get<GroupMaster[]>(`${this.baseUrl}/lov/groups`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Method to get all SaleTypeMasters
  getAllSaleTypeMasters(): Observable<SaleTypeMaster[]> {
    return this.http.get<SaleTypeMaster[]>(`${this.baseUrl}/lov/saletypes`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Method to get all ItemMasters
  getAllItemMasters(): Observable<ItemMaster[]> {
    return this.http.get<ItemMaster[]>(`${this.baseUrl}/lov/items`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Method to get all PartyMasters
  getAllPartyMasters(): Observable<PartyMaster[]> {
    return this.http.get<PartyMaster[]>(`${this.baseUrl}/lov/parties`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Method to get a PartyMaster by Id
  getPartyMasterById(id: number): Observable<PartyMaster> {
    return this.http.get<PartyMaster>(`${this.baseUrl}/lov/party/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Method to get an ItemMaster by Id
  getItemMasterById(id: number): Observable<ItemMaster> {
    return this.http.get<ItemMaster>(`${this.baseUrl}/lov/item/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getLogisticsData(fromDate: string, toDate: string): Observable<any> {
    const params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate);

    return this.http.get<any>(this.logisticsUrl, {
      headers: this.getAuthHeaders(),
      params,
    });
  }

  // Method to get logistics details by piNo and invoiceNo
  getLogisticsById(piNo: number, invoiceNo: number = 0): Observable<any> {
    const params = new HttpParams()
      .set('piNo', piNo.toString())
      .set('invoiceNo', invoiceNo.toString());

    return this.http.get<any>(`${this.logisticsUrl}/GetLogisticsById`, {
      headers: this.getAuthHeaders(),
      params,
    });
  }

  // Save new info
  saveLogisticsInfo(logisticsInfo: LogisticsInfo): Observable<LogisticsInfo> {
    return this.http.post<LogisticsInfo>(
      `${this.logisticsUrl}/SaveLogisticsInfo`,
      logisticsInfo,
      { headers: this.getAuthHeaders() }
    );
  }
  // For Server Side Pagination
  getLogisticsDataPages( pageNo: number, pageSize: number, fromDate: string, toDate: string): Observable<any> {
    const params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.logisticsUrl}/GetLogisticsDataPages`, {
      params,
      headers: this.getAuthHeaders(),
    });
    
  }
}
