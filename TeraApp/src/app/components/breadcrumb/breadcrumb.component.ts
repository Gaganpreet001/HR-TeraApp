import { Component } from '@angular/core';
import { BreadcrumbService } from '../../Services/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {
  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    // Subscribe to the breadcrumb updates
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }

}
