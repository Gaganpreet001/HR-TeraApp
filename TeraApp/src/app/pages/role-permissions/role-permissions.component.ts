import { Component } from '@angular/core';
import { RolePermissionsService } from '../../Services/role-permissions.service';
import { RolePermissions, RoleMaster } from '../../../../Models/type';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleMasterService } from '../../Services/role-master.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

// export type RolePermissions = {
//   id?: number ;
//   menuId?: number;
//   actionName?: string;
//   isAdd?: boolean;
//   isEdit?: boolean;
//   isDelete?: boolean;
//   isDisplay?: boolean;
//   roleId?: number;
//   enteredBy?: string;
//   enteredOn?: Date;
//   updatedBy?: string;
//   updatedOn?: Date;
// };

@Component({
  selector: 'app-role-permissions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './role-permissions.component.html',
  styleUrl: './role-permissions.component.css',
})
export class RolePermissionsComponent {
  rolePermissionsList: any[] = [];
  roles: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  error: string | null = null;
  success: string | null = null;

  // Form for selecting RoleId
  roleForm = new FormGroup({
    roleId: new FormControl(1),
  });

  constructor(
    private rolePermissionsService: RolePermissionsService, // Replace with actual service name
    private modalService: NgbModal,
    private roleService: RoleMasterService
  ) {}

  ngOnInit(): void {
    // Initial load of data when component is initialized
    this.loadRoles();
    this.loadRolePermissionsData();
  }
  loadRoles() {
    console.log('Roles Load Method Called');
    this.roleService.getAllRoles(1, 100).subscribe({
      next: (roles: RoleMaster[]) => {
        console.log(roles);
        this.roles = roles;
        this.totalItems = this.roles[0].totalRows ?? 0;
      },
      error: (err) => {
        console.log(err);
        this.error = 'Failed To Load Role Master Data.';
      },
    });
  }

  loadRolePermissionsData(): void {
    if (this.roleForm.valid) {
      const roleId = this.roleForm.get('roleId')?.value || 1;

      this.rolePermissionsService.getPermissionsByRoleId(roleId).subscribe({
        next: (response) => {
          console.log(response);
          this.rolePermissionsList = response;
          this.error = null;
        },
        error: (err) => {
          this.error =
            'Failed to fetch Role Permissions data. Please try again later.';
          console.error(err);
        },
      });
    } else {
      this.error = 'Please select a valid RoleId.';
    }
  }

  onChange(permission: any, field: string, event: Event): void {
    // Clone the permission object to avoid mutating the original data
    const updatedPermission = { ...permission };
  
    // Update the specific field based on the checkbox state
    updatedPermission[field] = (event.target as HTMLInputElement).checked;
  
    // Include roleId from the form
    const roleId = this.roleForm.get('roleId')?.value;
    if (!roleId) {
      console.error('RoleId is not selected.');
      this.error = 'Please select a valid role before modifying permissions.';
      return;
    }
    updatedPermission.roleId = roleId;
  
    console.log('Updated Permission to Save:', updatedPermission);
  
    // Save the updated permission
    this.rolePermissionsService.savePermission(updatedPermission).subscribe({
      next: () => {
        console.log('Permission saved successfully:', updatedPermission);
        this.loadRolePermissionsData(); // Refresh the list
      },
      error: (err) => {
        console.error('Error saving permission:', err);
        this.error = 'Failed to save permissions.';
      },
    });
  }
  
  // Optional: To reset the form if needed
  resetForm(): void {
    this.roleForm.reset();
    this.error = null;
  }
}
