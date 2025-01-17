import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CompanyMaster } from '../../../../Models/type';
import { CompanyMasterService } from '../../Services/company-master.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SharedStorageService } from '../../Services/shared-storage.service';

@Component({
  selector: 'app-company-ae',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './company-ae.component.html',
  styleUrl: './company-ae.component.css'
})
export class CompanyAEComponent {
  @Input() companyId: number | null = null; // To edit a specific company
  @Output() companyUpdated = new EventEmitter<CompanyMaster>();
  isEditForm: boolean = false;
  companyForm: FormGroup;
  responseData: CompanyMaster = {};

  constructor(
    private companyService: CompanyMasterService,
    private activeModal: NgbActiveModal,
    private sharedStorageService: SharedStorageService
  ) {
    this.companyForm = new FormGroup({
      id: new FormControl(0),
      companyName: new FormControl(''),
      legalName: new FormControl(''),
      shortName: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      phone: new FormControl('', Validators.pattern(/^[0-9]{10}$/) ),
      emailId: new FormControl('', Validators.email),
      gstin: new FormControl(''),
      pan: new FormControl(''),
      enteredBy: new FormControl(''),
      enteredOn: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedOn: new FormControl('') 
    });
  }

  ngOnInit(): void {
    if (this.companyId) {
      if(this.companyId > 0){
        this.isEditForm = true;
      }
      this.loadCompanyData(this.companyId);
    }
  }

  loadCompanyData(id: number): void {
    this.companyService.getCompanyById(id).subscribe((data: CompanyMaster) => {
      if (data) {
        this.companyForm.patchValue({
          id: data.id,
          companyName: data.companyName,
          legalName: data.legalName,
          shortName: data.shortName,
          address: data.address,
          city: data.city,
          phone: data.phone,
          emailId: data.emailId,
          gstin: data.gstin,
          pan: data.pan,
          enteredBy: data.enteredBy,
          enteredOn: data.enteredOn,
          updatedBy: data.updatedBy,
          updatedOn: data.updatedOn
        });
      }
    });
  }

  submit(): void {
    if (this.companyForm.valid) {
     const companyData: CompanyMaster = this.companyForm.value;
     if(this.isEditForm){
      companyData.updatedOn = new Date().toISOString();
      companyData.updatedBy = this.sharedStorageService.getCurrentUser();
      console.log(companyData.updatedBy);
     }else{
      companyData.enteredOn = new Date().toISOString();
      companyData.enteredBy = this.sharedStorageService.getCurrentUser();
      console.log(companyData.enteredBy);
     }
     if (!companyData.updatedOn) {
      companyData.updatedOn = null; 
    }
    if (!companyData.enteredOn) {
      companyData.enteredOn = null; // Handle null value
    }
    
     console.log(companyData);
      this.companyService.saveCompany(companyData).subscribe(
        (response: CompanyMaster) => {
          console.log('Company data submitted successfully:', response);
          this.responseData = response;

          this.companyUpdated.emit(this.responseData);
          this.activeModal.close();
        },
        (error) => {
          console.error('Error submitting company data:', error);
        }
      );
    } else {
      console.log('Form is incomplete or invalid');
    }
  }

  resetForm(): void {
    this.companyForm.reset();
    this.companyId = null;
  }

  onClose(): void {
    this.activeModal.close();
  }
}
