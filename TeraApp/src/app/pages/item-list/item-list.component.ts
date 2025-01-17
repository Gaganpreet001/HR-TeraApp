import { Component, ViewChild } from '@angular/core';
import { ItemMaster } from '../../../../Models/type';
import { ItemService } from '../../Services/item.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemAEComponent } from '../item-ae/item-ae.component';
import { DataTablesWrapperModule } from '../../shared/data-tables-wrapper.module';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';


@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ItemAEComponent, DataTablesWrapperModule], // Include the ItemAEComponent here
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'] 
})
export class ItemListComponent {
  items: ItemMaster[] = [];
  dtOptions: Config = {}; 
  dtTrigger: Subject<any> = new Subject();

  @ViewChild('itemModal') itemModal: any;

  constructor(private itemService: ItemService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers', // Enable pagination
      pageLength: 10, // Default items per page
      processing: true, // Show processing indicator
      ordering: false, // Disable sorting
      lengthChange: false, // Disable entries per page change dropdown
      searching: true, // Enable searching
      destroy: true,// Add more options here as needed
    };
    this.loadItems();
  }

  // Load all items
  loadItems() {
    this.itemService.getAllItems().subscribe((items: ItemMaster[]) => {
      console.log(items);
      this.items = items;
      this.dtTrigger.next(null);
    });
  }

  editItem(id: number | undefined) {
    if (id) {
      this.openModal(id);
    } else {
      console.error('Invalid item ID');
    }
  }

  // Open modal for adding a new item
  addItem() {
    this.openModal(null); // Open modal without ID for adding a new item
  }

  // Open the modal for item AE component
  openModal(id: number | null) {
    const modalRef = this.modalService.open(ItemAEComponent);
    if (id) {
      modalRef.componentInstance.itemId = id; // Pass the item ID to the modal
    }
    modalRef.result.then(
      () => console.log('Modal dismissed'),
      () => this.loadItems(), // Reload the list when modal closes

    );
  }

  // Delete an item by id
  deleteItem(id: number | undefined) {
    if (id) {
      this.itemService.deleteItem(id).subscribe(() => {
        this.loadItems(); // Reload the items list after deletion
      });
    } else {
      console.error('Invalid item ID');
    }
  }
   ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();  // Unsubscribe from dtTrigger to avoid memory leaks
  }
}
