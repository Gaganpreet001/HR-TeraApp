import { Component } from '@angular/core';
import { MenuMaster } from '../../../../Models/type';
import { MenuService } from '../../Services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MenuAEComponent } from '../menu-ae/menu-ae.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [NgxPaginationModule,CommonModule, MenuAEComponent],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})

export class MenuListComponent {
  menus: MenuMaster[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  error: string | null = null;

  constructor(private menuService: MenuService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus() {
    console.log('Menus Load Method Called');
    this.menuService.getAllMenusList(this.currentPage, this.pageSize).subscribe({
      next: (menus: MenuMaster[]) => {
        console.log(menus);
        this.menus = menus;
        this.totalItems = this.menus[0]?.totalRows ?? 0; // Assuming `totalRows` is present
      },
      error: (err) => {
        console.log(err);
        this.error = 'Failed To Load Menu Master Data.';
      },
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadMenus();
  }

  editMenu(id: number | undefined) {
    if (id) {
      this.openModal(id);
    } else {
      console.error('Invalid menu ID');
    }
  }

  addMenu() {
    this.openModal(null);
  }

  openModal(id: number | null) {
    const modalRef = this.modalService.open(MenuAEComponent);
    if (id) {
      modalRef.componentInstance.menuId = id;
    }

    modalRef.componentInstance.menuUpdated.subscribe((updatedMenu: MenuMaster) => {
      const existingIndex = this.menus.findIndex((menu) => menu.id === updatedMenu.id);
      if (existingIndex >= 0) {
        this.menus[existingIndex] = updatedMenu;
      } else {
        this.menus.push(updatedMenu);
      }
    });

    modalRef.result.finally(() => {
      this.loadMenus();
    });
  }

  deleteMenu(id: number | undefined) {
    if (id) {
      this.menuService.deleteMenu(id).subscribe(() => {
        this.loadMenus();
      });
    } else {
      console.error('Invalid menu ID');
    }
  }

}
