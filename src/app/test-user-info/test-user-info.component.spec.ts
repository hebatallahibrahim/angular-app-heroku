import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUserInfoComponent } from './test-user-info.component';

describe('TestUserInfoComponent', () => {
  let component: TestUserInfoComponent;
  let fixture: ComponentFixture<TestUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestUserInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
