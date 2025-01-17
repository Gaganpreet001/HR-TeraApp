import { Component } from '@angular/core';
import { FinancialYearMaster } from '../../../../Models/type';
import { FinancialYearMasterService } from '../../Services/financial-year-master.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinancialYearAEComponent } from '../financial-year-ae/financial-year-ae.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-financial-year-list',
  standalone: true,
  imports: [ FinancialYearAEComponent,CommonModule,NgxPaginationModule],
  templateUrl: './financial-year-list.component.html',
  styleUrl: './financial-year-list.component.css'
})
export class FinancialYearListComponent {
  financialYears: FinancialYearMaster[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  error: string | null = null;

  constructor(private financialYearService: FinancialYearMasterService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadFinancialYears();
  }

  loadFinancialYears(): void {
    console.log('Financial Years Load Method Called');
    this.financialYearService.getAllFinancialYears(this.currentPage, this.pageSize).subscribe({
      next: (financialYears: FinancialYearMaster[]) => {
        console.log(financialYears);
        this.financialYears = financialYears;
        this.totalItems =this.financialYears[0].totalRows ?? 0;
      },
      error: (err) => {
        console.log(err);
        this.error = "Failed to Load Financial Year Data." 
      }
    });
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadFinancialYears();
  }

  addFinancialYear(): void {
    this.openModal(null);
  }

  editFinancialYear(id: number | undefined): void {
    if (id) {
      this.openModal(id);
    } else {
      console.error('Invalid financial year ID');
    }
  }

  openModal(id: number | null): void {
    const modalRef = this.modalService.open(FinancialYearAEComponent);
    if (id) {
      modalRef.componentInstance.financialYearId = id;
    }

    modalRef.componentInstance.financialYearUpdated.subscribe((updatedFY: FinancialYearMaster) => {
      const existingIndex = this.financialYears.findIndex((fy) => fy.id === updatedFY.id);
      if (existingIndex >= 0) {
        this.financialYears[existingIndex] = updatedFY;
      } else {
        this.financialYears.push(updatedFY);
      }
    });

    modalRef.result.finally(() => {
      this.loadFinancialYears();
    });
  }

  deleteFinancialYear(id: number | undefined): void {
    if (id) {
      this.financialYearService.deleteFinancialYear(id).subscribe(() => {
        this.loadFinancialYears();
      });
    } else {
      console.error('Invalid financial year ID');
    }
  }
}
