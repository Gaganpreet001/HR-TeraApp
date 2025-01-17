import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuService } from '../../Services/menu.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuMaster } from '../../../../Models/type';
import { SharedStorageService } from '../../Services/shared-storage.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-ae',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './menu-ae.component.html',
  styleUrl: './menu-ae.component.css'
})
export class MenuAEComponent {
  @Input() menuId: number | null = null; // To edit a specific menu
  @Output() menuUpdated = new EventEmitter<MenuMaster>();
  menus: MenuMaster[] = [];
  isEditForm: boolean = false;
  menuForm: FormGroup;
  responseData: MenuMaster = {} as MenuMaster;

  constructor(
    private menuService: MenuService,
    private activeModal: NgbActiveModal,
    private sharedStorageService: SharedStorageService
  ) {
    this.menuForm = new FormGroup({
      id: new FormControl(0),
      parent: new FormControl(null),
      parentId: new FormControl(),
      menuTitle: new FormControl(''),
      link: new FormControl(''),
      icon: new FormControl(''),
      isOpen: new FormControl(false),
      controllerName: new FormControl(''),
      actionName: new FormControl(''),
      enteredBy: new FormControl(''),
      enteredOn: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedOn: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (this.menuId) {
      if (this.menuId > 0) {
        this.isEditForm = true;
      }
      this.loadMenuData(this.menuId);
    }
    this.loadMenuList();
  }

  loadMenuList(){
    console.log('Menus Load Method Called');
    this.menuService. getAllMenus().subscribe({
      next: (menus: MenuMaster[]) => {
        console.log(menus);
        this.menus = menus;
      },
      error: (err:any) => {
        console.log(err);
        //this.error = 'Failed To Load Menu Master Data.';
      },
    });
  }

  loadMenuData(id: number): void {
    this.menuService.getMenuById(id).subscribe((data: MenuMaster) => {
      if (data) {
        this.menuForm.patchValue({
          id: data.id,
          parent: data.parent,
          parentId: data.parentId,
          menuTitle: data.menuTitle,
          link: data.link,
          icon: data.icon,
          isOpen: data.isOpen,
          controllerName: data.controllerName,
          actionName: data.actionName,
          enteredBy: data.enteredBy,
          enteredOn: data.enteredOn,
          updatedBy: data.updatedBy,
          updatedOn: data.updatedOn,
        });
      }
    });
  }

  submit(): void {
    console.log(this.menuForm.value);
    if (this.menuForm.valid) {
      const menuData: MenuMaster = this.menuForm.value;
      if (this.isEditForm) {
        menuData.updatedOn = new Date().toISOString();
        menuData.updatedBy = this.sharedStorageService.getCurrentUser();
      } else {
        menuData.enteredOn = new Date().toISOString();
        menuData.enteredBy = this.sharedStorageService.getCurrentUser();
      }

      if (!menuData.updatedOn) {
        menuData.updatedOn = null; // Handle null value
      }
      if (!menuData.enteredOn) {
        menuData.enteredOn = null; // Handle null value
      }

      this.menuService.saveMenu(menuData).subscribe(
        (response: MenuMaster) => {
          console.log('Menu data submitted successfully:', response);
          this.responseData = response;

          this.menuUpdated.emit(this.responseData);
          this.activeModal.close();
        },
        (error) => {
          console.error('Error submitting menu data:', error);
        }
      );
    } else {
      console.log('Form is incomplete or invalid');
    }
  }

  resetForm(): void {
    this.menuForm.reset();
    this.menuId = null;
  }

  onClose(): void {
    this.activeModal.close();
  }
  checkData(val: number| undefined){
    console.log(val);
  }
}
