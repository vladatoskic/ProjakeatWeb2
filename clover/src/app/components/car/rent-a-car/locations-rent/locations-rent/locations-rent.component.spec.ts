import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsRentComponent } from './locations-rent.component';

describe('LocationsRentComponent', () => {
  let component: LocationsRentComponent;
  let fixture: ComponentFixture<LocationsRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
