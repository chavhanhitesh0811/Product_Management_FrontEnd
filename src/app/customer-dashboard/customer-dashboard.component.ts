import { Component } from '@angular/core';
import { GetAllProductsService } from '../services/get-all-products.service';
import { ProductModule } from '../product/product.module';
import { GetProductService } from '../services/get-product.service';
import { AuthCheckService } from '../services/auth-check.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { SearchProductPipe } from '../pipes/search-product.pipe';
import { CurrentVisitedProductService } from '../services/current-visited-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {

  private searchProductPipe: SearchProductPipe = new SearchProductPipe;

  constructor(
    private getAllProductsService: GetAllProductsService,
    private getProductService: GetProductService,
    private authcheckService: AuthCheckService,
    private oauthService: OAuthService,
    private currentVisitedProductService: CurrentVisitedProductService,
    private router: Router
  ) { }

  products: ProductModule[] = [];
  productsCopy: ProductModule[] = [];

  ngOnInit(): void {

    setTimeout(() => {

      // login/logout check
      this.authcheckService.checkValidity();

      this.getAllProductsService.getAllProducts().subscribe(
        (result: any) => {
          this.products = result.data;
          this.productsCopy = result.data;
        },
      )

    }, 200);
  }

  // logic for searching of products 
  searchProduct(value: string) {
    let searchedProducts: ProductModule[] = this.searchProductPipe.transform(this.productsCopy, value);

    if (searchedProducts.length == 0 && value == "") {
      this.products = this.productsCopy;
    }
    else {
      this.products = searchedProducts;
    }
  }

  visitedProduct: ProductModule[] = [];
  getProduct(product: ProductModule) {

    // login/logout validity check
    if (this.oauthService.getAccessTokenExpiration() < Date.now()) {
      this.oauthService.logOut();
      this.oauthService.initCodeFlow();
    }
    else {

      this.currentVisitedProductService.setProduct(product);
      this.router.navigate(['view-product']);

      let id: any = product.id;
      this.getProductService.getProduct(id).subscribe();
    }
  }
}
