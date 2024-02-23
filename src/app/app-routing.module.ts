import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddProductComponent} from '../app/add-product/add-product.component'
import {DeleteProductComponent} from '../app/delete-product/delete-product.component';
import {GetProductComponent} from '../app/get-product/get-product.component';
import {MostVisitedComponent} from '../app/most-visited/most-visited.component';
import {UpdateProductComponent} from '../app/update-product/update-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path:'add-product',component: AddProductComponent},
  {path:'delete-product',component: DeleteProductComponent},
  {path:'get-product',component: GetProductComponent},
  {path:'update-product',component: UpdateProductComponent},
  {path:'most-visited',component: MostVisitedComponent},
  {path:'customer-dashboard',component: CustomerDashboardComponent},
  {path:'admin-dashboard',component: DashboardComponent},
  {path:'view-product',component:ViewProductComponent},
  {path:'cart',component:CartComponent},
  {path:'',component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
