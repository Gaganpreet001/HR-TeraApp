import { Component } from '@angular/core';
import { RoleMaster } from '../../../../Models/type';
import { RoleMasterService } from '../../Services/role-master.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleAEComponent } from '../role-ae/role-ae.component';
import { CommonModule} from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [RoleAEComponent, CommonModule,NgxPaginationModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent {
  roles: RoleMaster[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0 ;
  error: string | null = null;
  constructor(private roleService: RoleMasterService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    console.log('Roles Load Method Called');
    this.roleService.getAllRoles(this.currentPage, this.pageSize).subscribe({
      next: (roles: RoleMaster[]) => {
        console.log(roles);
        this.roles = roles;
        this.totalItems = this.roles[0].totalRows ?? 0; 
      },
      error: (err) => {
        console.log(err);
        this.error = "Failed To Load Role Master Data."
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadRoles();
  }

  editRole(id: number | undefined) {
    if (id) {
      this.openModal(id);
    } else {
      console.error('Invalid role ID');
    }
  }

  addRole() {
    this.openModal(null);
  }

  openModal(id: number | null) {
    const modalRef = this.modalService.open(RoleAEComponent);
    if (id) {
      modalRef.componentInstance.roleId = id;
    }

    modalRef.componentInstance.roleUpdated.subscribe((updatedRole: RoleMaster) => {
      const existingIndex = this.roles.findIndex((role) => role.id === updatedRole.id);
      if (existingIndex >= 0) {
        this.roles[existingIndex] = updatedRole;
      } else {
        this.roles.push(updatedRole);
      }
    });

    modalRef.result.finally(() => {
      this.loadRoles();
    });
  }

  deleteRole(id: number | undefined) {
    if (id) {
      this.roleService.deleteRole(id).subscribe(() => {
        this.loadRoles();
      });
    } else {
      console.error('Invalid role ID');
    }
  }

}
