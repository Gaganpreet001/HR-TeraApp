import { TestBed } from '@angular/core/testing';

import { ListOfValueService } from './list-of-value.service';

describe('ListOfValueService', () => {
  let service: ListOfValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
