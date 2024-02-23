import { Component } from '@angular/core';
import { GetProductService } from '../services/get-product.service';
import { GetAllProductsService } from '../services/get-all-products.service';
import { ProductModule } from '../product/product.module';
import { OAuthService } from "angular-oauth2-oidc";
import { AuthCheckService } from '../services/auth-check.service';
import { SearchProductPipe } from '../pipes/search-product.pipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrl: './get-product.component.css'
})
export class GetProductComponent {

  searchedValue: string = "";

  private searchProductPipe: SearchProductPipe = new SearchProductPipe;

  constructor(
    private getProductService: GetProductService,
    private getAllProductsService: GetAllProductsService,
    private oauthService: OAuthService,
    private authCheckService: AuthCheckService,
    private http: HttpClient
  ) { }

  toNumber(productId: string): number {
    return parseInt(productId);
  }

  products: ProductModule[] = [];
  productsCopy: ProductModule[] = [];

  ngOnInit(): void {

    // login/logout check
    // this.authCheckService.checkValidity();

    if (this.searchedValue != "") {
      console.log(this.searchedValue)
      this.searchProduct(this.searchedValue);
    }
    else {
      this.getAllProductsService.getAllProducts().subscribe(
        (result: any) => {
          this.products = result.data;
          this.productsCopy = result.data;
        }
      )
    }
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
    this.authCheckService.checkValidity();

    let id: any = product.id;
    this.getProductService.getProduct(id).subscribe(
      (result: any) => {
        console.log(result.data[0])
        this.visitedProduct[0] = result.data[0]
      },
      (error: any) => {
        if (error.status == 401) {
          this.oauthService.logOut();
          this.oauthService.initCodeFlow();
        }
      }
    );
  }

  // selectedFile: File | null = null;

  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];
  // }

  // onUpload(): void {
  //   if (this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('file', this.selectedFile);

  //     let token = sessionStorage.getItem('access_token');
  //     const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

  //     this.http.post('http://localhost:8080/api/upload', formData, { headers })
  //       .subscribe(response => {
  //         console.log('Image uploaded successfully:', response);
  //       }, error => {
  //         console.error('Error uploading image:', error);
  //       });
  //   } else {
  //     console.error('No file selected.');
  //   }
  // }
}
