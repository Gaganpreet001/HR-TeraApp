import { Component } from '@angular/core';
import { ListOfValueService } from '../../Services/list-of-value.service';
import { CompanyMaster, FinancialYearMaster } from '../../../../Models/type';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedStorageService } from '../../Services/shared-storage.service';

@Component({
  selector: 'app-select-company-year',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './select-company-year.component.html',
  styleUrl: './select-company-year.component.css'
})
export class SelectCompanyYearComponent {

  selectForm: FormGroup;
  companies: CompanyMaster[] = [];
  financialYears: FinancialYearMaster[] = [];
  username: any = null;

  constructor(private lovService: ListOfValueService, private router: Router, private sharedStorageService: SharedStorageService) {
    this.selectForm = new FormGroup({
      company: new FormControl('', Validators.required),
      financialYear: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.username = this.sharedStorageService.getCurrentUser()?.split("@");
    // Fetch companies and financial years from service
    this.lovService.getAllCompanies().subscribe(
      (data) => (this.companies = data),
      (error) => console.error('Error fetching companies:', error)
    );

    this.lovService.getAllFinancialYears().subscribe(
      (data) => (this.financialYears = data),
      (error) => console.error('Error fetching financial years:', error)
    );
  }

  submitSelection(): void {
    if (this.selectForm.valid) {
      const { company, financialYear } = this.selectForm.value;

      sessionStorage.setItem('selectedCompany', JSON.stringify(company));
      sessionStorage.setItem('selectedFinancialYear', JSON.stringify(financialYear));

      this.router.navigate(['/layout/CompanyList']);  
    } else {
      alert('Please select both a company and a financial year.');
    }
  }
}
