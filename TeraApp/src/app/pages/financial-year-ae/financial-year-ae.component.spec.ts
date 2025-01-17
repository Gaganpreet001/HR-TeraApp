import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialYearAEComponent } from './financial-year-ae.component';

describe('FinancialYearAEComponent', () => {
  let component: FinancialYearAEComponent;
  let fixture: ComponentFixture<FinancialYearAEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialYearAEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialYearAEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
