import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RemoveFromCartService {

  constructor(
    private http : HttpClient
  ) { }

  removefromCart(productId : number): Observable<any> {
    let token = sessionStorage.getItem('access_token');
    const apiUrl = `${environment.removeFromCartUrl}${productId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`});
    return this.http.delete(apiUrl, { headers });
  }
}
