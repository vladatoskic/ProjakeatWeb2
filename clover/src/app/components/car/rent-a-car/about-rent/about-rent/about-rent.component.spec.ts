import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRentComponent } from './about-rent.component';

describe('AboutRentComponent', () => {
  let component: AboutRentComponent;
  let fixture: ComponentFixture<AboutRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
