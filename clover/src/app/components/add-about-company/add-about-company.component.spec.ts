import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAboutCompanyComponent } from './add-about-company.component';

describe('AddAboutCompanyComponent', () => {
  let component: AddAboutCompanyComponent;
  let fixture: ComponentFixture<AddAboutCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAboutCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAboutCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
