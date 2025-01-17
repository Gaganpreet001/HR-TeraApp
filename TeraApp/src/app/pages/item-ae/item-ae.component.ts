import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../Services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemMaster, GroupMaster, UnitMaster } from '../../../../Models/type';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LovService } from '../../Services/lov.service';

@Component({
  selector: 'app-item-ae',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './item-ae.component.html',
  styleUrl: './item-ae.component.css'
})
export class ItemAEComponent {
  itemForm: FormGroup;
  @Input() itemId: number | null = null;
  //@Output() close = new EventEmitter<void>();
  groups: GroupMaster [] = [];
  units: UnitMaster [] = [];

  constructor(
    private itemService: ItemService,
    private lovService: LovService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private activeModal: NgbActiveModal
  ) {
    this.itemForm = new FormGroup({
      code: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      unitId: new FormControl(null, Validators.required),
      groupId: new FormControl(null, Validators.required),
    });

    this.lovService.getAllUnitMasters().subscribe((units) => {
      this.units = units;
    });

    this.lovService.getAllGroupMasters().subscribe((groups) => {
      this.groups = groups;
    });

  }

  ngOnInit() {
    if (this.itemId) {
      this.loadItemData(this.itemId);
    } else {
      this.activatedRoute.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        if (id) {
          this.itemId = id;
          this.loadItemData(id);
        }
      });
    }
  }
  

  loadItemData(id: number) {
    this.itemService.getItemById(id).subscribe(item => {
      if (item) {
        this.itemForm.setValue({
          code: item.code,
          name: item.name,
          unitId: item.unitId,
          groupId: item.groupId,
        });
      }
    });
  }

  submit() {
    if (this.itemForm.valid) {
      const itemData: ItemMaster = this.itemForm.value;
      if (this.itemId) {
        this.itemService.updateItem(itemData, this.itemId).subscribe(() => {
          console.log('Item Updated Successfully');
          this.activeModal.close();
          //this.router.navigate(['/layout/ItemList']); // Redirect after editing
        });
      } else {
        this.itemService.addNewItem(itemData).subscribe(() => {
          console.log('Item Added Successfully');
          this.activeModal.close();
          //this.router.navigate(['layout/ItemList']); // Redirect after adding
        });
      }
    } else {
      console.log('Incomplete Data');
    }
  }

  resetForm() {
    this.itemForm.reset();
    this.itemId = null;
  }

  onClose(){
    this.activeModal.close();
  }
}
