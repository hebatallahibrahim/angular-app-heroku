import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavnarComponent } from './navnar.component';

describe('NavnarComponent', () => {
  let component: NavnarComponent;
  let fixture: ComponentFixture<NavnarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavnarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavnarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
