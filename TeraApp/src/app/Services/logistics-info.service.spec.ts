import { TestBed } from '@angular/core/testing';

import { LogisticsInfoService } from './logistics-info.service';

describe('LogisticsInfoService', () => {
  let service: LogisticsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogisticsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
