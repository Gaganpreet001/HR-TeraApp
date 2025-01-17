import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAeComponent } from './customer-ae.component';

describe('CustomerAeComponent', () => {
  let component: CustomerAeComponent;
  let fixture: ComponentFixture<CustomerAeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
