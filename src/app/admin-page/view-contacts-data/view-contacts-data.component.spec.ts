import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactsDataComponent } from './view-contacts-data.component';

describe('ViewContactsDataComponent', () => {
  let component: ViewContactsDataComponent;
  let fixture: ComponentFixture<ViewContactsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewContactsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContactsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
