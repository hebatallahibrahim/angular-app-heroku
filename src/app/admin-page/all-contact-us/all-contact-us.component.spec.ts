import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContactUsComponent } from './all-contact-us.component';

describe('AllContactUsComponent', () => {
  let component: AllContactUsComponent;
  let fixture: ComponentFixture<AllContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllContactUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
