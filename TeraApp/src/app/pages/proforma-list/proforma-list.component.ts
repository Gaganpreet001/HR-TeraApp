import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProformaService } from '../../Services/proforma.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proforma-list',
  standalone: true,
  imports: [ReactiveFormsModule, NgxPaginationModule, CommonModule],
  templateUrl: './proforma-list.component.html',
  styleUrl: './proforma-list.component.css'
})

export class ProformaListComponent {
  proformaList: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  error: string | null = null;

  constructor(private proformaService: ProformaService, private modalService: NgbModal) {}

  dateForm = new FormGroup({
    fromDate: new FormControl('2023-01-01', Validators.required),
    toDate: new FormControl('2024-11-16', Validators.required),
  });

  ngOnInit(): void {
    this.loadProformaData();
  }

  loadProformaData(): void {
    if (this.dateForm.valid) {
      const fromDate = this.dateForm.get('fromDate')?.value ?? '';
      const toDate = this.dateForm.get('toDate')?.value ?? '';

      this.proformaService.getProformaPanelList(this.currentPage, this.pageSize, fromDate, toDate).subscribe({
        next: (response) => {
          console.log(response);
          this.proformaList = response;
          this.totalItems =this.proformaList[0].totalRows ;
          this.error = null;
        },
        error: (err) => {
          this.error = 'Failed to fetch Proforma data. Please try again later.';
          console.error(err);
        },
      });
    } else {
      this.error = 'Please select both From Date and To Date.';
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProformaData();
  }

}
