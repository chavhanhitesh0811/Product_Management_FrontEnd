import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GetProductService {

  constructor(
    private http : HttpClient
  ) { }

  getProduct(productId : number){
    let token = sessionStorage.getItem('access_token');
    const apiUrl =  `${environment.getProductByIdUrl}${productId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`});
    return this.http.get(apiUrl,{ headers: headers });
  }
}
