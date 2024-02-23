import { Component , ViewChild} from '@angular/core';
import { GetUserProductsService } from '../services/get-user-products.service';
import { UpdateProductService } from '../services/update-product.service';
import { ProductModule } from '../product/product.module';
import { OAuthService } from "angular-oauth2-oidc";
import { AuthCheckService } from '../services/auth-check.service';
import { SearchProductPipe } from '../pipes/search-product.pipe';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {

  private searchProductPipe: SearchProductPipe = new SearchProductPipe;

  constructor(
    private getUserProductsService: GetUserProductsService,
    private updateProductService: UpdateProductService,
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
    
    // login/logout validity check
    // this.authCheckService.checkValidity();

    this.getUserProductsService.getUserProducts().subscribe(
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
  id?: number;
  name: string = "";
  brand: string = "";
  price?: number;
  description : string = "";
  imageUrl : string = "";

  productToUpdate: ProductModule[] = [];
  selectProductToUpdate(product: ProductModule) {
    this.id = product.id;
    this.name = product.productName;
    this.brand = product.brand;
    this.price = product.price;
    this.description = product.description;
    this.imageUrl = product.imageUrl
  }

  // updating the values of the products
  updateProduct(productId: number, productName: string, productBrand: string, productPrice: number,productDescription:string) {

    // login/logout validity check
    this.authCheckService.checkValidity();
    
    const data = {
      "productName": productName,
      "brand": productBrand,
      "price": productPrice,
      "image": this.imageUrl,
      "description" : productDescription
    };

    this.updateProductService.updateProductDetails(data, productId).subscribe(
      (result: any[]) => {
        alert("Product details updated successfully!");
        location.reload();
      },
      (error) => {
        if (error.status == 401) {
          this.oauthService.logOut();
          this.oauthService.initCodeFlow();
        }
        else{
          alert(error.error.message)
        }
      }
    );
  }

}
