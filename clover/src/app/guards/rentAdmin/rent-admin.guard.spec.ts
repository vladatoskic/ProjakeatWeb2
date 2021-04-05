import { TestBed } from '@angular/core/testing';

import { RentAdminGuard } from './rent-admin.guard';

describe('RentAdminGuard', () => {
  let guard: RentAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RentAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
