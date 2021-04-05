import { TestBed } from '@angular/core/testing';

import { OfficeDetailsService } from './office-details.service';

describe('OfficeDetailsService', () => {
  let service: OfficeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
