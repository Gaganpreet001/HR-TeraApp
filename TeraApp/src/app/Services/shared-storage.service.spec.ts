import { TestBed } from '@angular/core/testing';

import { SharedStorageService } from './shared-storage.service';

describe('SharedStorageService', () => {
  let service: SharedStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
