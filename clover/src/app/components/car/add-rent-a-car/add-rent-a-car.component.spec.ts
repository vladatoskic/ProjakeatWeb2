import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRentACarComponent } from './add-rent-a-car.component';

describe('AddRentACarComponent', () => {
  let component: AddRentACarComponent;
  let fixture: ComponentFixture<AddRentACarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRentACarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRentACarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
