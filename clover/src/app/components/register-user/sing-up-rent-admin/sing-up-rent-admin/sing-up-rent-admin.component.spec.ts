import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpRentAdminComponent } from './sing-up-rent-admin.component';

describe('SingUpRentAdminComponent', () => {
  let component: SingUpRentAdminComponent;
  let fixture: ComponentFixture<SingUpRentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingUpRentAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingUpRentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
