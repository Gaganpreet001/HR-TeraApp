import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCompanyYearComponent } from './select-company-year.component';

describe('SelectCompanyYearComponent', () => {
  let component: SelectCompanyYearComponent;
  let fixture: ComponentFixture<SelectCompanyYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCompanyYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCompanyYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
