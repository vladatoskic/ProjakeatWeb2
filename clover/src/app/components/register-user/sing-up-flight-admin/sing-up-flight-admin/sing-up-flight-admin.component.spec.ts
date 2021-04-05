import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpFlightAdminComponent } from './sing-up-flight-admin.component';

describe('SingUpFlightAdminComponent', () => {
  let component: SingUpFlightAdminComponent;
  let fixture: ComponentFixture<SingUpFlightAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingUpFlightAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingUpFlightAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
