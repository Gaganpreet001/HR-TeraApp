import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAEComponent } from './company-ae.component';

describe('CompanyAEComponent', () => {
  let component: CompanyAEComponent;
  let fixture: ComponentFixture<CompanyAEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyAEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
