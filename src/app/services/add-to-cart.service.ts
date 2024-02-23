import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor(private http: HttpClient) { }

  addToCart(productId : number): Observable<any> {
    let token = sessionStorage.getItem('access_token');
    const apiUrl = `${environment.addToCartUrl}${productId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`});
    return this.http.post(apiUrl,{}, { headers });
  }
}
