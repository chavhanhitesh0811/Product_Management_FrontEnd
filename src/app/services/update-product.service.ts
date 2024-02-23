import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UpdateProductService {

  constructor(
    private http: HttpClient
  ) { }

  updateProductDetails(data: any, productId: number): Observable<any> {
    let token = sessionStorage.getItem('access_token');
    const apiUrl = `${environment.updateProductUrl}${productId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
    return this.http.put(apiUrl, data, { headers });
  }
}
