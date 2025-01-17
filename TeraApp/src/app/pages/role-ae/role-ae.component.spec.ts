import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAEComponent } from './role-ae.component';

describe('RoleAEComponent', () => {
  let component: RoleAEComponent;
  let fixture: ComponentFixture<RoleAEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleAEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleAEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
