import { TestBed } from '@angular/core/testing';

import { GetUserProductsService } from './get-user-products.service';

describe('GetUserProductsService', () => {
  let service: GetUserProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
