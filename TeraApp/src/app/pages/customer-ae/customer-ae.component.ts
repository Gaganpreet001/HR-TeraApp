import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-ae',
  standalone: true, // Make this component standalone
  imports: [FormsModule, CommonModule], // Import required modules here
  templateUrl: './customer-ae.component.html',
  styleUrls: ['./customer-ae.component.css']
})
export class CustomerAeComponent {
  order = {
    orderNo: 1,
    phone: '',
    orderDate: '',
    orderTotal: 0,
    party: '',
    address: '',
    saleType: '',
    items: [
      { item: '', unit: '', group: '', quantity: 0, rate: 0, amount: 0 }
    ]
  };

  items = [
    { name: 'Product1', unit: 'Piece', group: 'Cars', rate: 10000 },
    { name: 'Product2', unit: 'Unit', group: 'Cars', rate: 800 }
  ];
  parties = ['Party A', 'Party B', 'Party C']; // Example party names


  onItemChange(index: number) {
    const selectedItem = this.items.find(i => i.name === this.order.items[index].item);
    if (selectedItem) {
      this.order.items[index].unit = selectedItem.unit;
      this.order.items[index].group = selectedItem.group;
      this.order.items[index].rate = selectedItem.rate;
      this.calculateAmount(index);
    }
  }

  calculateAmount(index: number) {
    const item = this.order.items[index];
    item.amount = item.quantity * item.rate;
    this.updateOrderTotal();
  }

  updateOrderTotal() {
    this.order.orderTotal = this.order.items.reduce((total, item) => total + item.amount, 0);
  }

  addItem() {
    this.order.items.push({ item: '', unit: '', group: '', quantity: 0, rate: 0, amount: 0 });
  }

  removeItem(index: number) {
    this.order.items.splice(index, 1);
    this.updateOrderTotal();
  }

  submit() {
    console.log('Order submitted:', this.order);
  }

  cancel() {
    console.log('Order cancelled');
  }

  // Prevent negative values in the quantity field
  preventNegative(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e') {
      event.preventDefault();
    }
  }
}
