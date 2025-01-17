import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinancialYearMasterService } from '../../Services/financial-year-master.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FinancialYearMaster } from '../../../../Models/type';
import { SharedStorageService } from '../../Services/shared-storage.service';

@Component({
  selector: 'app-financial-year-ae',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './financial-year-ae.component.html',
  styleUrl: './financial-year-ae.component.css'
})
// export type FinancialYearMaster = {
//   id?: number;
//   fromDate?: Date;
//   toDate?: Date;
//   enteredBy?: string;
//   enteredOn?: string | null;
//   updatedBy?: string;
//   updatedOn?: string | null;
//   totalRows?: number;
// }
export class FinancialYearAEComponent {
  @Input() financialYearId: number | null = null; // To edit a specific financial year
  @Output() financialYearUpdated = new EventEmitter<FinancialYearMaster>();
  isEditForm: boolean = false;
  financialYearForm: FormGroup;
  responseData: FinancialYearMaster = {} as FinancialYearMaster;

  constructor(
    private financialYearService: FinancialYearMasterService,
    private activeModal: NgbActiveModal,
    private sharedStorageService: SharedStorageService
  ) {
    this.financialYearForm = new FormGroup({
      id: new FormControl(0),
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      enteredBy: new FormControl(''),
      enteredOn: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedOn: new FormControl('')
    });
  }

  ngOnInit(): void {
    if (this.financialYearId) {
      if (this.financialYearId > 0) {
        this.isEditForm = true;
      }
      this.loadFinancialYearData(this.financialYearId);
    }
  }

  loadFinancialYearData(id: number): void {
    this.financialYearService.getFinancialYearById(id).subscribe((data: FinancialYearMaster) => {
      if (data) {
        this.financialYearForm.patchValue({
          id: data.id,
          fromDate: data.fromDate,
          toDate: data.toDate,
          enteredBy: data.enteredBy,
          enteredOn: data.enteredOn,
          updatedBy: data.updatedBy,
          updatedOn: data.updatedOn
        });
      }
    });
  }

  submit(): void {
    if (this.financialYearForm.valid) {
      const financialYearData: FinancialYearMaster = this.financialYearForm.value;
      if (this.isEditForm) {
        financialYearData.updatedOn = new Date().toISOString();
        financialYearData.updatedBy = this.sharedStorageService.getCurrentUser();
        console.log(financialYearData.updatedBy)
      } else {
        financialYearData.enteredOn = new Date().toISOString();
        financialYearData.enteredBy = this.sharedStorageService.getCurrentUser();
        console.log(financialYearData.enteredBy)
      }

      if (!financialYearData.updatedOn) {
        financialYearData.updatedOn = null; // Handle null value
      }
      if (!financialYearData.enteredOn) {
        financialYearData.enteredOn = null; // Handle null value
      }

      console.log(financialYearData);
      this.financialYearService.saveFinancialYear(financialYearData).subscribe(
        (response: FinancialYearMaster) => {
          console.log('Financial Year data submitted successfully:', response);
          this.responseData = response;

          this.financialYearUpdated.emit(this.responseData);
          this.activeModal.close();
        },
        (error) => {
          console.error('Error submitting financial year data:', error);
        }
      );
    } else {
      console.log('Form is incomplete or invalid');
    }
  }

  resetForm(): void {
    this.financialYearForm.reset();
    this.financialYearId = null;
  }

  onClose(): void {
    this.activeModal.close();
  }
}
