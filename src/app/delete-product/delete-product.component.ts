import { Component } from '@angular/core';
import { DeleteProductService } from '../services/delete-product.service';
import { ProductModule } from '../product/product.module';
import { OAuthService } from "angular-oauth2-oidc";
import { GetAllProductsService } from '../services/get-all-products.service';
import { AuthCheckService } from '../services/auth-check.service';
import { SearchProductPipe } from '../pipes/search-product.pipe';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {

  private searchProductPipe: SearchProductPipe = new SearchProductPipe;

  constructor(
    private deleteProductService: DeleteProductService,
    private getAllProductsService : GetAllProductsService,
    private oauthService: OAuthService,
    private authCheckService: AuthCheckService
  ) { }

  toNumber(value: string): number {
    return parseInt(value);
  }

  // getting the products uplded by user
  products: ProductModule[] = [];
  productsCopy: ProductModule[] = [];

  ngOnInit(): void {

    // login/logout check
    // this.authCheckService.checkValidity();

    this.getAllProductsService.getAllProducts().subscribe(
      (result: any) => {
        this.products = result.data;
        this.productsCopy = result.data;
      }
    )
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

  // updating the value of the input fields in the modal
  id: any;
  selectProductToDelete(product: ProductModule) {
    this.id = product.id;
  }

  deleteProduct(): void {

    // logout / login validity check
    this.authCheckService.checkValidity();

    this.deleteProductService.deleteProduct(this.id).subscribe(
      (result: any) => {
        alert("Product deleted successfully!");
        this.ngOnInit();
      },

      (error: any) => {
        if (error.status == 401) {
          this.oauthService.logOut();
          this.oauthService.initCodeFlow();
        }
        else if (error.status == 403) {
          alert("Sorry! You do not have the access to delete the products.");
        }
        else {
          alert("Something went wrong! Please try again.");
        }
      }
    );
  }
}
