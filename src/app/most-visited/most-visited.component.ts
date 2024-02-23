import { Component } from '@angular/core';
import { MostVisitedService } from '../services/most-visited.service';
import { ProductModule } from '../product/product.module';
import { OAuthService } from "angular-oauth2-oidc";
import { AuthCheckService } from '../services/auth-check.service';
import { SearchProductPipe } from '../pipes/search-product.pipe';

@Component({
  selector: 'app-most-visited',
  templateUrl: './most-visited.component.html',
  styleUrl: './most-visited.component.css'
})
export class MostVisitedComponent {

  private searchProductPipe: SearchProductPipe = new SearchProductPipe;

  constructor(
    private getMostVisitedService: MostVisitedService,
    private oauthService: OAuthService,
    private authCheckService:AuthCheckService
  ) { }

  products: ProductModule[] = [];
  productsCopy: ProductModule[] = [];

  ngOnInit(): void {
    
    // login/logout validity check
    // this.authCheckService.checkValidity();
    
    this.getMostVisitedService.getMostVisited().subscribe(
      (result: any) => {
        this.products = result.data;
        this.productsCopy = result.data;
      }
    );
  }

  // logic for searching of products 
  searchProduct(value: string) {
    let searchedProducts: ProductModule[] = this.searchProductPipe.transform(this.productsCopy,value);

    if (searchedProducts.length == 0 && value == "") {
      this.products = this.productsCopy;
    }
    else {
      this.products = searchedProducts;
    }
  }
}
