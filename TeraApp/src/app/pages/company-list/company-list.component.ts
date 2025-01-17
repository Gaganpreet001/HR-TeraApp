import { Component, ViewChild } from '@angular/core';
import { CompanyAEComponent } from '../company-ae/company-ae.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LovService } from '../../Services/lov.service';
import { CompanyMasterService } from '../../Services/company-master.service';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';
import { CompanyMaster } from '../../../../Models/type';
import { CommonModule } from '@angular/common';
import { DataTablesWrapperModule } from '../../shared/data-tables-wrapper.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MenuService } from '../../Services/menu.service';
NgxPaginationModule
@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule,DataTablesWrapperModule,CompanyAEComponent,NgxPaginationModule],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
//pagination
export class CompanyListComponent {
  companies: CompanyMaster[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  error: string | null = null;

  dtOptions: Config = {}; 
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild('companyModal') companyModal: any;


  constructor(private companyService: CompanyMasterService, private modalService: NgbModal,private menusService:MenuService) {}

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      ordering: false,
      lengthChange: false,
      searching: false,

      destroy: true // Ensure the table instance is destroyed before reinitialization
    };

    // Load initial company data
    this.loadCompaniesList();
    console.log(sessionStorage.getItem('currentUser'));
  }

  loadCompaniesList() {
    this.menusService.getAllMenus().subscribe((data) => {
      console.log(data);
    })
    //console.log("Companies Load Method Called");
    this.companyService.getAllCompaniesList(this.currentPage, this.pageSize).subscribe({
      next: (companies: CompanyMaster[]) => {
        //console.log(companies);
        this.companies = companies;
        this.totalItems = this.companies[0]?.totalRows ?? 0; 
        console.log(this.totalItems);
      },
      error: (err) => {
        console.error("Error fetching companies list:", err);
        this.error = "Failed to load companies list. Please try again later.";
      }
    });
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCompaniesList()
  }

  editCompany(id: number | undefined) {
    if (id) {
      this.openModal(id);
    } else {
      console.error('Invalid company ID');
    }
  }

  addCompany() {
    this.openModal(null);
  }

  openModal(id: number | null) {
    const modalRef = this.modalService.open(CompanyAEComponent);
    if (id) {
      modalRef.componentInstance.companyId = id; 
    }
    modalRef.componentInstance.companyUpdated.subscribe((responseData: CompanyMaster) => {
      const existingIndex = this.companies.findIndex((item) => item.id === responseData.id);
      if (existingIndex >= 0) {
        this.companies[existingIndex].companyName = responseData.companyName;
        this.companies[existingIndex].legalName =  responseData.legalName;
        this.companies[existingIndex].shortName = responseData.shortName;
        this.companies[existingIndex].address = responseData.address;
        this.companies[existingIndex].city =  responseData.city;
        this.companies[existingIndex].phone = responseData.phone;
        this.companies[existingIndex].emailId =  responseData.emailId;
        this.companies[existingIndex].gstin = responseData.gstin;
        this.companies[existingIndex].pan = responseData.pan;
        this.companies[existingIndex].enteredBy = responseData.enteredBy;
        this.companies[existingIndex].enteredOn =  responseData.enteredOn;
        this.companies[existingIndex].updatedBy = responseData.updatedBy;
        this.companies[existingIndex].updatedOn = responseData.updatedOn;
      }  
      this.loadCompaniesList()
    });
    modalRef.result.then(
      () => console.log('Model Closed'),
      () =>this.loadCompaniesList() 
    );
    

  }

  deleteCompany(id: number | undefined) {
    if (id) {
      this.companyService.deleteCompany(id).subscribe(() => {
        this.loadCompaniesList()
      });
    } else {
      console.error('Invalid company ID');
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe(); 
  }

}
