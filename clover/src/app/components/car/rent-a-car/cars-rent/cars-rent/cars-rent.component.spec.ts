import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsRentComponent } from './cars-rent.component';

describe('CarsRentComponent', () => {
  let component: CarsRentComponent;
  let fixture: ComponentFixture<CarsRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
