// add Validation in the Input Date Fields that they should not have any date slected before 
// Given orderDate as input
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LogisticsEdit, LogisticsInfo } from '../../../../Models/type'; // Adjust the import path accordingly
import { LovService } from '../../Services/lov.service';
// import { LogisticsInfoService } from '../../Services/logistics.service'; // Adjust the service import
import { ActivatedRoute } from '@angular/router';
import { LogisticsInfoService } from '../../Services/logistics-info.service';

// Custom Date Validator
function dateAfterOrderDateValidator(orderDate: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || !orderDate) {
      return null;
    }

    const selectedDate = new Date(control.value);
    // If the selected date is before the order date, return an error.
    return selectedDate < orderDate
      ? { dateBeforeOrderDate: { value: control.value, orderDate: orderDate.toISOString().split('T')[0] } }
      : null;
  };
}


@Component({
  selector: 'app-logistics-ae',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './logistics-ae.component.html',
  styleUrls: ['./logistics-ae.component.css'],
})

export class LogisticsAEComponent implements OnInit {
  logisticsForm: FormGroup;
  @Input() piNo: number | null = null;
  @Input() orderDate: string = '';
  @Output() dataUpdated = new EventEmitter<LogisticsInfo>();
  responseData: LogisticsInfo= {};

  constructor(
    private lovService: LovService,
    private logisticInfoService: LogisticsInfoService,
    private activeModal: NgbActiveModal,
    private activatedRoute: ActivatedRoute
  ) {
    console.log("order Date" + this.orderDate); // It is giving  me '' as OrderDate 
    this.logisticsForm = new FormGroup({
      id: new FormControl(0),
      ordeR_No: new FormControl(0),
      pA_NO: new FormControl(''),
      customer: new FormControl(''),
      invoiceNo: new FormControl(0),
      invoiceDate: new FormControl(''),
      coc: new FormControl(''),
      railOut: new FormControl(''),
      targetSOB: new FormControl(''),
      actualSOB: new FormControl(''),
      actualVesselDetails: new FormControl(''),
      targetETA: new FormControl(''),
      actualETA: new FormControl(''),
      cargoUnloadingDate: new FormControl(''),
      remarks: new FormControl(''),
    });
  }

  ngOnInit() {
    if (this.piNo) {
      console.log(this.piNo);
      console.log(this.orderDate); //It is giving  me 2023-01-02T00:00:00 as OrderDate 
      // Convert the orderDate input to a Date object
      const orderDateObj = new Date(this.orderDate);

      // Update validators once the orderDate is available
      this.setDateValidators(orderDateObj);

      this.loadLogisticsData(this.piNo);
    }
  }

  setDateValidators(orderDate: Date) {
    // Update the form controls with the date validator
    this.logisticsForm.get('railOut')?.setValidators(dateAfterOrderDateValidator(orderDate));
    this.logisticsForm.get('targetSOB')?.setValidators(dateAfterOrderDateValidator(orderDate));
    this.logisticsForm.get('actualSOB')?.setValidators(dateAfterOrderDateValidator(orderDate));
    this.logisticsForm.get('targetETA')?.setValidators(dateAfterOrderDateValidator(orderDate));
    this.logisticsForm.get('actualETA')?.setValidators(dateAfterOrderDateValidator(orderDate));
    this.logisticsForm.get('cargoUnloadingDate')?.setValidators(dateAfterOrderDateValidator(orderDate));

    // Update the validation status
    this.logisticsForm.updateValueAndValidity();
  }

 
  loadLogisticsData(piNo: number) {
    this.lovService.getLogisticsById(piNo).subscribe((data) => {
      if (data) {
        console.log(data);
        console.log("Comming Data " + data[0].customer + data[0].logisticRowId );

        this.logisticsForm.patchValue({
          id: data[0].logisticRowId || 0,  
          ordeR_No: data[0].pino,
          pA_NO: data[0].pA_NO,
          customer: data[0].customer,
          invoiceNo: data[0].invoiceNo,
          invoiceDate: this.formatDate(data[0].invoiceDate),
          coc: data[0].coc,
          railOut: this.formatDate(data[0].railOut),
          targetSOB: this.formatDate(data[0].targetSOB),
          actualSOB: this.formatDate(data[0].actualSOB),
          actualVesselDetails: data[0].actualVesselDetails,
          targetETA: this.formatDate(data[0].targetETA),
          actualETA: this.formatDate(data[0].actualETA),
          cargoUnloadingDate: this.formatDate(data[0].cargoUnloadingDate),
          remarks: data[0].remarks,
        });
      }
    });
  }

  formatDate(dateString: string | null): string | null {
    if (!dateString) {
      return null;
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date.toISOString().split('T')[0]; // Returns 'yyyy-MM-dd'
  }


  submit() {
    console.log("form value ",this.logisticsForm.value);
    if (this.logisticsForm.valid) {
      // Mapping the form values
      const logisticsData: LogisticsInfo = {
        id: this.logisticsForm.value.id, 
        ordeR_NO: this.logisticsForm.value.ordeR_No,
        invoicE_NO: this.logisticsForm.value.invoiceNo,
        coc: this.logisticsForm.value.coc,
        actuaL_VESSEL_DETAILS: this.logisticsForm.value.actualVesselDetails,
        actuaL_SOB: this.logisticsForm.value.actualSOB,
        targeT_SOB: this.logisticsForm.value.targetSOB,
        raiL_OUT: this.logisticsForm.value.railOut,
        targeT_ETA: this.logisticsForm.value.targetETA,
        actuaL_ETA: this.logisticsForm.value.actualETA,
        cargO_UNLOADING_DATE: this.logisticsForm.value.cargoUnloadingDate,
        remarks: this.logisticsForm.value.remarks
      };

      //console.log("Data to be saved " + logisticsData.ordeR_NO,logisticsData.remarks, logisticsData.id);
      //console.log("Logistics Data"+ logisticsData );

      this.lovService.saveLogisticsInfo(logisticsData).subscribe(
        response => {
          console.log("Logistics Data Submitted Successfully:");
          this.responseData = response;

          this.dataUpdated.emit(this.responseData);

          //console.log(this.responseData);
          this.activeModal.close();
        },
        error => {
          console.error("Error Submitting Logistics Data:", error);
        }
      );
    } else {
      console.log('Incomplete Data');
    }
  }
  
  // submit() {
  //   console.log(this.logisticsForm.value);
  //   if (this.logisticsForm.valid) {
  //     const logisticsData: LogisticsEdit = this.logisticsForm.value;
  //     if (this.piNo) {
  //        this.logisticsService.updateLogistics(logisticsData, this.piNo).subscribe(() => {
  //        console.log('Logistics Updated Successfully');
  //        this.activeModal.close();
  //     });
  //     } else {
  //       this.logisticsService.addNewLogistics(logisticsData).subscribe(() => {
  //          console.log('Logistics Added Successfully');
  //          this.activeModal.close();
  //      });
  //     }
  //   } else {
  //     console.log('Incomplete Data');
  //   }
  // }

  resetForm() {
    this.logisticsForm.reset();
    this.piNo = null;
  }

  onClose() {
    this.activeModal.close();
  }
}

