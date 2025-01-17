import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAEComponent } from './user-ae.component';

describe('UserAEComponent', () => {
  let component: UserAEComponent;
  let fixture: ComponentFixture<UserAEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
