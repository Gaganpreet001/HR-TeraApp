import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';
import { CommonModule } from '@angular/common';
import { DataTablesWrapperModule } from '../../shared/data-tables-wrapper.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { CustomerAeComponent } from '../customer-ae/customer-ae.component';


@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, DataTablesWrapperModule, NgxPaginationModule,CustomerAeComponent],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'], // Fix for 'styleUrl' typo
})
export class CustomerListComponent {
  customers: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  error: string | null = null;

  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private modalService: NgbModal, private router: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      ordering: false,
      lengthChange: false,
      searching: false,
      destroy: true,
    };

    this.loadMockCustomers();
  }

  loadMockCustomers() {
    this.customers = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      customerName: `Customer ${i + 1}`,
      contactPerson: `Contact ${i + 1}`,
      OrderNo: `Order${i + 1}`,
      phone: `123-456-78${i % 10}`,
      email: `customer${i + 1}@example.com`,
      address: `Address ${i + 1}`,
      city: `City ${i % 5}`,
    }));
    this.totalItems = this.customers.length;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  addCustomer(): void {
    this.router.navigate(['layout/CustomerAE']);
    console.log("button is clicked")
  }

  openModal(id: number | null) {
    const modalRef = this.modalService.open(CustomerAeComponent);
    if (id) {
      modalRef.componentInstance.customerId = id;
    }
    modalRef.componentInstance.customerUpdated.subscribe((responseData: any) => {
      if (!responseData.OrderNo || responseData.OrderNo.trim() === '') {
        console.error('OrderNo is required.');
        this.error = 'OrderNo must have a valid value.';
        return;
      }

      const existingIndex = this.customers.findIndex((item) => item.id === responseData.id);
      if (existingIndex >= 0) {
        this.customers[existingIndex] = { ...responseData };
      } else {
        this.customers.push({
          id: this.customers.length + 1,
          ...responseData,
        });
      }
    });

    modalRef.result.then(
      () => console.log('Modal Closed'),
      () => console.log('Modal Dismissed')
    );
  }

  deleteCustomer(id: number | undefined) {
    if (id) {
      this.customers = this.customers.filter((customer) => customer.id !== id);
    } else {
      console.error('Invalid customer ID');
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
