import { TestBed } from '@angular/core/testing';

import { AllFlightsDetailsService } from './all-flights-details.service';

describe('AllFlightsDetailsService', () => {
  let service: AllFlightsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllFlightsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
