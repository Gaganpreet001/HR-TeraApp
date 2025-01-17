import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})

export class PaginationComponent {

  @Input() totalItems: number = 0; // Total number of items
  @Input() itemsPerPage: number = 10; // Items per page
  @Input() currentPage: number = 1; // Current page
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5; // Limit to 5 pages
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage: number, endPage: number;

    if (this.totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = this.totalPages;
    } else {
      if (this.currentPage <= halfMaxVisiblePages) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (this.currentPage + halfMaxVisiblePages >= this.totalPages) {
        startPage = this.totalPages - maxVisiblePages + 1;
        endPage = this.totalPages;
      } else {
        startPage = this.currentPage - halfMaxVisiblePages;
        endPage = this.currentPage + halfMaxVisiblePages;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(page); // Emit the page number
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }
 
}
