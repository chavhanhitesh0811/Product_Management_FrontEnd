import { TestBed } from '@angular/core/testing';

import { CurrentVisitedProductService } from './current-visited-product.service';

describe('CurrentVisitedProductService', () => {
  let service: CurrentVisitedProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentVisitedProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
