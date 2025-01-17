import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemMaster } from '../../../Models/type';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = "http://localhost:5266/api"; // Base URL for the API

  constructor(private http: HttpClient) { } // Use dependency injection for HttpClient

  // Get all items

  getAllItems(): Observable<ItemMaster[]> {
    return this.http.get<ItemMaster[]>(`${this.baseUrl}/ItemMaster`);
  }

  // Get item by Id
  getItemById(id: number): Observable<ItemMaster> {
    return this.http.get<ItemMaster>(`${this.baseUrl}/ItemMaster/${id}`);
  }

  // Add a new item
  addNewItem(newItem: ItemMaster): Observable<ItemMaster> {
    return this.http.post<ItemMaster>(`${this.baseUrl}/ItemMaster`, newItem);
  }

  // Update an existing item
  updateItem(updatedItem: ItemMaster, id: number): Observable<ItemMaster> {
    return this.http.put<ItemMaster>(`${this.baseUrl}/ItemMaster/${id}`, updatedItem);
  }

  // Delete an item by Id
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ItemMaster/${id}`);
  }

}
