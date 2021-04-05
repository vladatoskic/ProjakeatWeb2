import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomocnaComponent } from './pomocna.component';

describe('PomocnaComponent', () => {
  let component: PomocnaComponent;
  let fixture: ComponentFixture<PomocnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PomocnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PomocnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
