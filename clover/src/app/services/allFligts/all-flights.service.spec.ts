import { TestBed } from '@angular/core/testing';

import { AllFlightsService } from './all-flights.service';

describe('AllFlightsService', () => {
  let service: AllFlightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllFlightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
