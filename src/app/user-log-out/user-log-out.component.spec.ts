import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogOutComponent } from './user-log-out.component';

describe('UserLogOutComponent', () => {
  let component: UserLogOutComponent;
  let fixture: ComponentFixture<UserLogOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLogOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLogOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
