import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRateComponent } from './car-rate.component';

describe('CarRateComponent', () => {
  let component: CarRateComponent;
  let fixture: ComponentFixture<CarRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
