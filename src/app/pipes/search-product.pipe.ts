import { Pipe, PipeTransform } from '@angular/core';
import { ProductModule } from '../product/product.module';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {
  
   transform(productListCopy: ProductModule[], value: string): ProductModule[] {
    let searchedProducts: ProductModule[] = [];
    productListCopy.forEach(product => {
      if (product.productName.toLowerCase().startsWith(value.toLowerCase())) {
        searchedProducts.push(product);
      }
    });
    return searchedProducts;
  }

  temp(productListCopy: ProductModule[], value: string): ProductModule[]{
    return this.transform(productListCopy,value);
  }

}
