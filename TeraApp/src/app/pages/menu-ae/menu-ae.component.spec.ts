import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAEComponent } from './menu-ae.component';

describe('MenuAEComponent', () => {
  let component: MenuAEComponent;
  let fixture: ComponentFixture<MenuAEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
