import { TestBed } from '@angular/core/testing';

import { AvioCompanyService } from './avio-company.service';

describe('AvioCompanyService', () => {
  let service: AvioCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvioCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
