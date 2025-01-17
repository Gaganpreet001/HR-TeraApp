import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoleMaster } from '../../../../Models/type'; 
import { RoleMasterService } from '../../Services/role-master.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedStorageService } from '../../Services/shared-storage.service';

@Component({
  selector: 'app-role-ae',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './role-ae.component.html',
  styleUrl: './role-ae.component.css'
})

export class RoleAEComponent {
  @Input() roleId: number | null = null; // To edit a specific role
  @Output() roleUpdated = new EventEmitter<RoleMaster>();
  isEditForm: boolean = false;
  roleForm: FormGroup;
  responseData: RoleMaster = {} as RoleMaster;

  constructor(
    private roleService: RoleMasterService,
    private activeModal: NgbActiveModal,
    private sharedStorageService: SharedStorageService
  ) {
    this.roleForm = new FormGroup({
      id: new FormControl(0),
      roleName: new FormControl('', Validators.required),
      description: new FormControl(''),
      enteredBy: new FormControl(''),
      enteredOn: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedOn: new FormControl('')
    });
  }

  ngOnInit(): void {
    if (this.roleId) {
      if (this.roleId > 0) {
        this.isEditForm = true;
      }
      this.loadRoleData(this.roleId);
    }
  }

  loadRoleData(id: number): void {
    this.roleService.getRoleById(id).subscribe((data: RoleMaster) => {
      if (data) {
        this.roleForm.patchValue({
          id: data.id,
          roleName: data.roleName,
          description: data.description,
          enteredBy: data.enteredBy,
          enteredOn: data.enteredOn,
          updatedBy: data.updatedBy,
          updatedOn: data.updatedOn
        });
      }
    });
  }

  submit(): void {
    if (this.roleForm.valid) {
      const roleData: RoleMaster = this.roleForm.value;
      if (this.isEditForm) {
        roleData.updatedOn = new Date().toISOString();
        roleData.updatedBy = this.sharedStorageService.getCurrentUser();
        console.log(roleData.updatedBy);
      } else {
        roleData.enteredOn = new Date().toISOString();
        roleData.enteredBy = this.sharedStorageService.getCurrentUser();
        console.log(roleData.enteredBy);
      }

      if (!roleData.updatedOn) {
        roleData.updatedOn = null; // Handle null value
      }
      if (!roleData.enteredOn) {
        roleData.enteredOn = null; // Handle null value
      }

      console.log(roleData);
      this.roleService.saveRole(roleData).subscribe(
        (response: RoleMaster) => {
          console.log('Role data submitted successfully:', response);
          this.responseData = response;

          this.roleUpdated.emit(this.responseData);
          this.activeModal.close();
        },
        (error) => {
          console.error('Error submitting role data:', error);
        }
      );
    } else {
      console.log('Form is incomplete or invalid');
    }
  }

  resetForm(): void {
    this.roleForm.reset();
    this.roleId = null;
  }

  onClose(): void {
    this.activeModal.close();
  }
}
