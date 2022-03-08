import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountsComponent } from './acounts.component';

describe('AcountsComponent', () => {
  let component: AcountsComponent;
  let fixture: ComponentFixture<AcountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
