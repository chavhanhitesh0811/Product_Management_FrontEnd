import { TestBed } from '@angular/core/testing';

import { MostVisitedService } from './most-visited.service';

describe('MostVisitedService', () => {
  let service: MostVisitedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostVisitedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
