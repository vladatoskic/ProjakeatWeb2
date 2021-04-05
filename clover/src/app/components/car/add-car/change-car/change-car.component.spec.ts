import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCarComponent } from './change-car.component';

describe('ChangeCarComponent', () => {
  let component: ChangeCarComponent;
  let fixture: ComponentFixture<ChangeCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
