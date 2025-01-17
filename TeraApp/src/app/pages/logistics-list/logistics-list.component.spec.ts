import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsListComponent } from './logistics-list.component';

describe('LogisticsListComponent', () => {
  let component: LogisticsListComponent;
  let fixture: ComponentFixture<LogisticsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogisticsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
