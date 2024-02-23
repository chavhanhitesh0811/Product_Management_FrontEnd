import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GetAllProductsService {

  constructor(
    private http : HttpClient
  ) { }

  getAllProducts(){
    let token : any = sessionStorage.getItem('access_token');
    const apiUrl =  environment.getAllProductUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`});
    return this.http.get(apiUrl,{ headers: headers });
  }
}
