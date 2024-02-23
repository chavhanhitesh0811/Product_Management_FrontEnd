import { TestBed } from '@angular/core/testing';

import { RemoveFromCartService } from './remove-from-cart.service';

describe('RemoveFromCartService', () => {
  let service: RemoveFromCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveFromCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
