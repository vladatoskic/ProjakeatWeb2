import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastRentCarComponent } from './fast-rent-car.component';

describe('FastRentCarComponent', () => {
  let component: FastRentCarComponent;
  let fixture: ComponentFixture<FastRentCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastRentCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastRentCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
