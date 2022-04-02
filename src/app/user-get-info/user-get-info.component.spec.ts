import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGetInfoComponent } from './user-get-info.component';

describe('UserGetInfoComponent', () => {
  let component: UserGetInfoComponent;
  let fixture: ComponentFixture<UserGetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGetInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
