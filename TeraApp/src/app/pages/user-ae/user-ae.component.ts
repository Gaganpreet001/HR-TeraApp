import { Component } from '@angular/core';
import { UserMaster, SelectedCompany, RoleMaster } from '../../../../Models/type';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { RoleMasterService } from '../../Services/role-master.service';
import { CompanyMasterService } from '../../Services/company-master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedStorageService } from '../../Services/shared-storage.service';
import { CommonModule } from '@angular/common';

type SelectedCompanyFormGroup = FormGroup<{
  id?: FormControl<number>;
  userId?: FormControl<number>;
  companyId?: FormControl<number>;
}>;

@Component({
  selector: 'app-user-ae',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-ae.component.html',
  styleUrl: './user-ae.component.css'
})

export class UserAEComponent {
  users: UserMaster[] = [];
  userForm: FormGroup;
  isEditForm: boolean = false;
  editingUserId: number | null = null;
  roles: any[] = []; 
  companies: any[] = []; 
  selectedUser: UserMaster | null = null;

  constructor(
    private userService: UserService,
    private roleService: RoleMasterService,
    private companyService: CompanyMasterService,
    private sharedService: SharedStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = new FormGroup({
      id: new FormControl(0),
      fullName: new FormControl(''),
      lastName: new FormControl(''),
      firstName: new FormControl(''),
      userName: new FormControl(''),
      password: new FormControl(''),
      roleId: new FormControl(null),
      email: new FormControl('', [ Validators.email]),
      emailPassword: new FormControl(''),
      mobileNo: new FormControl(''),
      photo: new FormControl(''),
      enteredBy: new FormControl(''),
      enteredOn: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedOn: new FormControl(''),
      selectedCompanies: new FormArray<SelectedCompanyFormGroup>([]),
    });
  }

  get selectedCompanies() {
    return this.userForm.get('selectedCompanies') as FormArray<SelectedCompanyFormGroup>;
  }

  ngOnInit(): void {
    this.loadAllData();

    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (!isNaN(id) && id > 0) {
        this.editingUserId = id;
        this.isEditForm = true;
        this.loadUserData(this.editingUserId);
      } else {
        this.editingUserId = null;
      }
    });
  }

  loadAllData(): void {
    this.userService.getAllUsers().subscribe((users: UserMaster[]) => {
        this.users = users;
    });
    this.roleService.getAllRoles(1, 100).subscribe((roles: RoleMaster[]) => {
        console.log(roles);
        this.roles = roles;
    });
    this.companyService.getAllCompanies().subscribe(
      (companies) => {
        this.companies = companies;
        console.log(companies);
      }
    );
  }

  addCompany(company: any): void {
    this.selectedCompanies.push(
      new FormGroup({
        id: new FormControl(0),
        userId: new FormControl(0),
        companyId: new FormControl(0),
      }) as SelectedCompanyFormGroup
    );
  }

  removeCompany(index: number): void {
    this.selectedCompanies.removeAt(index);
  }

  submit(): void {
    if (this.userForm.valid) {
      const userData: UserMaster = this.userForm.value;
  
      if (this.isEditForm) {
        userData.updatedOn = new Date().toISOString();
        userData.updatedBy = this.sharedService.getCurrentUser();
      } else {
        userData.enteredOn = new Date().toISOString();
        userData.enteredBy = this.sharedService.getCurrentUser();
      }

      if (!userData.updatedOn) {
        userData.updatedOn = null; 
      }
      if (!userData.enteredOn) {
        userData.enteredOn = null;
      }
  
      console.log(userData);
  
      this.userService.saveUser(userData).subscribe(
        (response: UserMaster) => {
          console.log('User data submitted successfully:', response);
          this.router.navigate(['/layout/UserList']);
        },
        (error) => {
          console.error('Error submitting user data:', error);
        }
      );
    } else {
      console.log('Form is incomplete or invalid');
    }
  }
  
  loadUserData(id: number): void {
    this.userService.getUserById(id).subscribe((user) => {
      console.log(user);
      this.selectedUser = user;
      this.userForm.patchValue(user);

      const companiesFormArray = this.userForm.get(
        'selectedCompanies'
      ) as FormArray;
      companiesFormArray.clear();

      user.selectedCompanies?.forEach((company) => {
        companiesFormArray.push(
          new FormGroup({
            id: new FormControl(company.id),
            userId: new FormControl(company.userId),
            companyId: new FormControl(company.companyId),
          }) as SelectedCompanyFormGroup
        );
      });
    });
  }

  cancel(): void {
    this.userForm.reset();
    this.selectedCompanies.clear();
    this.isEditForm = false;
    this.editingUserId = null;
  }
  onPhotoUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log(file);
    }
  }
  
}
