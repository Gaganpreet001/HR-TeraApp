import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, } from '@angular/core';
import { LovService } from '../../Services/lov.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';
import { CommonModule } from '@angular/common';
import { DataTablesWrapperModule } from '../../shared/data-tables-wrapper.module';
import { LogisticsAEComponent } from '../logistics-ae/logistics-ae.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogisticsInfo } from '../../../../Models/type';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedStorageService } from '../../Services/shared-storage.service';

@Component({
  selector: 'app-logistics-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DataTablesWrapperModule,
    LogisticsAEComponent,
    NgxPaginationModule
  ],
  templateUrl: './logistics-list.component.html',
  styleUrls: ['./logistics-list.component.css'],
})
export class LogisticsListComponent implements OnInit, OnDestroy {
  logisticsData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  isSidebarOpen: boolean = true;

  @ViewChild('logisticModal') logisticModal: any;

  error: string | null = null;

  constructor(private lovService: LovService, private modalService: NgbModal, private sharedStorage: SharedStorageService) {
    // Subscribe to the sidebar state
    this.sharedStorage.isSidebarOpen$.subscribe((state) => {
      this.isSidebarOpen = state;
      console.log('Sidebar is open:', this.isSidebarOpen);
    });
  }

  dateForm = new FormGroup({
    fromDate: new FormControl('2024-01-01', Validators.required),
    toDate: new FormControl('2024-10-30', Validators.required),
  });

  ngOnInit(): void {

    this.loadLogisticsDataPages();
  }

  loadLogisticsDataPages(): void {
    if (this.dateForm.valid) {
      const fromDate = this.dateForm.get('fromDate')?.value ?? '';
      const toDate = this.dateForm.get('toDate')?.value ?? '';

      this.lovService.getLogisticsDataPages(this.currentPage, this.pageSize, fromDate, toDate).subscribe({
        next: (response) => {
          this.logisticsData = response.data;
          this.totalItems = response.totalCount;
          this.error = null;
        },
        error: (err) => {
          this.error = 'Failed to fetch logistics data. Please try again later.';
          console.error(err);
        },
      });
    } else {
      this.error = 'Please select both From Date and To Date.';
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadLogisticsDataPages();
  }

  openModal(piNo: number | null, piDate: string) {
    const modalRef = this.modalService.open(LogisticsAEComponent);
    if (piNo) {
      modalRef.componentInstance.piNo = piNo;
      modalRef.componentInstance.orderDate = piDate;
    }
    modalRef.componentInstance.dataUpdated.subscribe((responseData: LogisticsInfo) => {
      const existingIndex = this.logisticsData.findIndex((item) => item.pino === String(responseData.ordeR_NO));
      if (existingIndex >= 0) {
        this.logisticsData[existingIndex].railOut = responseData.raiL_OUT;
        this.logisticsData[existingIndex].coc =  responseData.coc;
        this.logisticsData[existingIndex].targetSOB = responseData.targeT_SOB;
        this.logisticsData[existingIndex].actualSOB = responseData.actuaL_SOB;
        this.logisticsData[existingIndex].actualVesselDetails =  responseData.actuaL_VESSEL_DETAILS;
        this.logisticsData[existingIndex].targetETA = responseData.targeT_ETA;
        this.logisticsData[existingIndex].actualETA =  responseData.actuaL_ETA;
        this.logisticsData[existingIndex].cargoUnloadingDate = responseData.cargO_UNLOADING_DATE;
        this.logisticsData[existingIndex].remarks = responseData.remarks
      }  
    });
    modalRef.result.then(
      () => console.log('Modal closed'),
      () => console.log('Modal dismissed')
    );
  }

  editLogisticData(piNo: number, piDate: string) {
    if (piNo) {
      this.openModal(piNo, piDate);
    } else {
      console.error('Invalid item ID');
    }
  }

  addLogisticData() {
    this.openModal(null, '');
  }

  ngOnDestroy(): void {}
}
