import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { LovService } from '../../Services/lov.service';
import { SharedStorageService } from '../../Services/shared-storage.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,SidebarComponent,CommonModule,BreadcrumbComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})

export class LayoutComponent {
  isSidebarVisible: boolean = true;
  constructor(private sharedStorage: SharedStorageService){}
 
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;  // Toggle sidebar visibility
    this.sharedStorage.setSidebarState(this.isSidebarVisible);
  }

}
