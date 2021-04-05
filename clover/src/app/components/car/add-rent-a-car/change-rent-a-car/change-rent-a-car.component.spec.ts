import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRentACarComponent } from './change-rent-a-car.component';

describe('ChangeRentACarComponent', () => {
  let component: ChangeRentACarComponent;
  let fixture: ComponentFixture<ChangeRentACarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRentACarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRentACarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
