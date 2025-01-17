import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedStorageService } from '../../Services/shared-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  username: string | null = null;
  @Output() sidebarToggle = new EventEmitter<void>();
  constructor(
    private router: Router,
    private sharedStorageService: SharedStorageService
  ) {}
  ngOnInit(): void {
    this.username = this.sharedStorageService.getCurrentUser();
  }
  toggleSidebar() {
    this.sidebarToggle.emit(); // Emit event to toggle the sidebar
  }
  logout() {
    this.sharedStorageService.setCurrentUser(null);
    sessionStorage.setItem('currentUser','');
    console.log(sessionStorage.getItem('currentUser'));
    localStorage.removeItem('token');
    console.log('Token Deleted');
    this.router.navigate(['/']);
  }
}
