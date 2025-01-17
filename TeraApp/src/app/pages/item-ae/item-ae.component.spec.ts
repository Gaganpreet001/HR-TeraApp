import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAEComponent } from './item-ae.component';

describe('ItemAEComponent', () => {
  let component: ItemAEComponent;
  let fixture: ComponentFixture<ItemAEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemAEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemAEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
