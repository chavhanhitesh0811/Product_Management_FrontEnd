import { TestBed } from '@angular/core/testing';

import { GetCartedProductService } from './get-carted-product.service';

describe('GetCartedProductService', () => {
  let service: GetCartedProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCartedProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
