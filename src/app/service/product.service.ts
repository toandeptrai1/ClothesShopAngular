import { Product } from './../models/Product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { Page } from '../models/Page';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string = 'http://localhost:8080/api/product';



  constructor(private http:HttpClient) {

   }
   public getProducts(product:Product):Observable<ApiResponse<Page>> {
    return this.http.post<ApiResponse<Page>>(this.url,product);
   }
   public getProductsByCategory(product:Product):Observable<ApiResponse<Page>> {
    return this.http.post<ApiResponse<Page>>(`${this.url}/by-category`,product);
   }
   public getProduct(productId:number):Observable<Product> {
    return this.http.get<Product>(`${this.url}/${productId}`);
   }

}
