import { TestBed } from '@angular/core/testing';

import { FlightAdminGuard } from './flight-admin.guard';

describe('FlightAdminGuard', () => {
  let guard: FlightAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FlightAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
