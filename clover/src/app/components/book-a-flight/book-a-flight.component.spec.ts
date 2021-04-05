import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAFlightComponent } from './book-a-flight.component';

describe('BookAFlightComponent', () => {
  let component: BookAFlightComponent;
  let fixture: ComponentFixture<BookAFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
