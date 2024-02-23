import { Component } from '@angular/core';
import { GetAllProductsService } from '../services/get-all-products.service';
import { ProductModule } from '../product/product.module';
import { GetProductService } from '../services/get-product.service';
import { AuthCheckService } from '../services/auth-check.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { SearchProductPipe } from '../pipes/search-product.pipe';
import { CurrentVisitedProductService } from '../services/current-visited-product.service';
import { Router } from '@angular/router';
import { GetCartedProductService } from '../services/get-carted-product.service';
import { RemoveFromCartService } from '../services/remove-from-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private searchProductPipe: SearchProductPipe = new SearchProductPipe;

  constructor(
    private authcheckService: AuthCheckService,
    private oauthService: OAuthService,
    private currentVisitedProductService: CurrentVisitedProductService,
    private router: Router,
    private cartedProductService: GetCartedProductService,
    private removeFromCartService: RemoveFromCartService
  ) { }

  products: ProductModule[] = [];
  productsCopy: ProductModule[] = [];

  ngOnInit(): void {

    setTimeout(() => {

      // login/logout check
      this.authcheckService.checkValidity();

      this.cartedProductService.getCartedProducts().subscribe(
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

  removeFromCart(productId: any) {
    // logout / login validity check
    this.authcheckService.checkValidity();

    this.removeFromCartService.removefromCart(productId).subscribe(
      (result: any) => {
        alert("Product deleted successfully!");
        this.ngOnInit();
      },

      (error: any) => {
        if (error.status == 401) {
          this.oauthService.logOut();
          this.oauthService.initCodeFlow();
        }
        else {
          alert("Something went wrong! Please try again.");
        }
      }
    );
  }
}
