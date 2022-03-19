import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubcategoryComponent } from './all-subcategory.component';

describe('AllSubcategoryComponent', () => {
  let component: AllSubcategoryComponent;
  let fixture: ComponentFixture<AllSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
