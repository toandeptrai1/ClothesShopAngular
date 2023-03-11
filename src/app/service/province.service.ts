import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { District } from '../models/District';
import { Province } from '../models/Province';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private http:HttpClient) {

  }
  getProvices():Observable<Province[]> {
    return this.http.get<Province[]>('https://provinces.open-api.vn/api/p/');
  }
  getProviceByCode(code:number):Observable<Province> {
    return this.http.get<Province>(`https://provinces.open-api.vn/api/p/${code}/?depth=2`)}
  getDistrictByCode(code:number):Observable<District> {
    return this.http.get<District>(`https://provinces.open-api.vn/api/d/${code}/?depth=2`);
  }
}
