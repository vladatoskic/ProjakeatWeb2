import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarFilterComponent } from './rent-a-car-filter.component';

describe('RentACarFilterComponent', () => {
  let component: RentACarFilterComponent;
  let fixture: ComponentFixture<RentACarFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
