import { TestBed } from '@angular/core/testing';

import { FinancialYearMasterService } from './financial-year-master.service';

describe('FinancialYearMasterService', () => {
  let service: FinancialYearMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialYearMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
