import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductModule {
  id? : number;
  productName = "";
  brand = "";
  email = "";
  price? : number;
  imageUrl = "";
  description = "";
}
