import { Component } from '@angular/core';
import { CurrentVisitedProductService } from '../services/current-visited-product.service';
import { ProductModule } from '../product/product.module';
import { Router } from '@angular/router';
import { AddToCartService } from '../services/add-to-cart.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {

  productToVisit: any;
  constructor(
    private currentVisitedProduct: CurrentVisitedProductService,
    private router: Router,
    private addToCartService: AddToCartService
  ) { }

  ngOnInit(): void {
    this.productToVisit = this.currentVisitedProduct.productToVisit;
    if (this.productToVisit == null) {
      this.router.navigate(['customer-dashboard']);
    }
  }

  addToCart(productId: number) {
    this.addToCartService.addToCart(productId).subscribe(
      (result: any[]) => {
        alert("Product added to cart successfully");
        this.router.navigate(['cart']);
      },
      (error: any) => {
        alert(error.error.message);
      }
    )
  }
}
