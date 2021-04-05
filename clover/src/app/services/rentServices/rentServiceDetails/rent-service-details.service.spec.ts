import { TestBed } from '@angular/core/testing';

import { RentServiceDetailsService } from './rent-service-details.service';

describe('RentServiceDetailsService', () => {
  let service: RentServiceDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentServiceDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
