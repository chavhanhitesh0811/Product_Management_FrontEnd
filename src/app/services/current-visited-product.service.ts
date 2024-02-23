import { Injectable } from '@angular/core';
import { ProductModule } from '../product/product.module';

@Injectable({
  providedIn: 'root'
})
export class CurrentVisitedProductService {

  productToVisit? : ProductModule;
  constructor() { }

  setProduct(product : ProductModule){
    this.productToVisit = product;
  }
}
