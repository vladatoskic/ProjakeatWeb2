import { TestBed } from '@angular/core/testing';

import { FlightRateSService } from './flight-rate-s.service';

describe('FlightRateSService', () => {
  let service: FlightRateSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightRateSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
