import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedStorageService {
  private isSidebarOpen = new BehaviorSubject<boolean>(true);
  private currentUser = new BehaviorSubject<any>(null); // For storing the current user

  isSidebarOpen$ = this.isSidebarOpen.asObservable();
  currentUser$ = this.currentUser.asObservable(); // Observable for current user

  setSidebarState(isOpen: boolean): void {
    this.isSidebarOpen.next(isOpen);
  }

  getSidebarState(): boolean {
    return this.isSidebarOpen.getValue();
  }

  setCurrentUser(user: any): void {
    this.currentUser.next(user);
  }

  getCurrentUser(): any {
    return this.currentUser.getValue();
  }
}
