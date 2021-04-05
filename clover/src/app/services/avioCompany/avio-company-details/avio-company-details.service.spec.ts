import { TestBed } from '@angular/core/testing';

import { AvioCompanyDetailsService } from './avio-company-details.service';

describe('AvioCompanyDetailsService', () => {
  let service: AvioCompanyDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvioCompanyDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
