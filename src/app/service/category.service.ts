import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url:string = 'http://localhost:8080/api/'

  constructor(private http:HttpClient) {
  }

  public getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.url}/category`);
   }
}
