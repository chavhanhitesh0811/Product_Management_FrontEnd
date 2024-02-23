import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GetUserProductsService {

  constructor(
    private http : HttpClient
  ) { }

  getUserProducts(){
    let token : any = sessionStorage.getItem('access_token');
    const apiUrl =  environment.getUserProductUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`});
    return this.http.get(apiUrl,{ headers: headers });
  }
}
