import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsAEComponent } from './logistics-ae.component';

describe('LogisticsAEComponent', () => {
  let component: LogisticsAEComponent;
  let fixture: ComponentFixture<LogisticsAEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogisticsAEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticsAEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
