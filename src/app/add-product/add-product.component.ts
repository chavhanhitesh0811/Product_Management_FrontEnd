import { Component } from '@angular/core';
import { AddProductService } from '../services/add-product.service';
import { Router } from '@angular/router';
import { OAuthService } from "angular-oauth2-oidc";
import { AuthCheckService } from '../services/auth-check.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  selectedFile: File | null = null;
  base64Image: string | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;

    if (this.selectedFile) {
      this.convertImageToBase64();
    }
  }

  constructor(
    private addProductService: AddProductService,
    private router: Router,
    private oauthService: OAuthService,
    private authCheckService: AuthCheckService
  ) {

  }

  ngOnInit(): void {
    // login/logout check
    // this.authCheckService.checkValidity();
  }

  toNumber(productPrice: string): number {
    return parseInt(productPrice);
  }

  convertImageToBase64() {
    const reader = new FileReader();

    reader.onloadend = () => {
      // The result will be the base64 representation of the image
      this.base64Image = reader.result as string;
    };

    reader.readAsDataURL(this.selectedFile as Blob);
  }

  addProduct(productName: string, productBrand: string, productPrice: number,productDescription:string): void {

    this.authCheckService.checkValidity();

    const postData = {
      "productName": productName,
      "brand": productBrand,
      "price": productPrice,
      "image":this.base64Image,
      "description" : productDescription
    };

    this.addProductService.addNewProduct(postData).subscribe(
      (result: any[]) => {
        alert("Product added successfully!");
        this.router.navigate(['customer-dashboard']);
      },
      (error: any) => {
        if (error.status == 401) {
          this.oauthService.logOut();
          this.oauthService.initCodeFlow();
        }
        alert(error.error.message);
      }
    );
  }
}
