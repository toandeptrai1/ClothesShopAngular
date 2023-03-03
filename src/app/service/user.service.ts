import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = 'http://localhost:8080/api/'


  constructor(private http: HttpClient,private storage:LocalStorageService) {

   }

   public login(user:User):Observable<User> {

    return this.http.post<User>(`${this.url}/user`,user);

   }

   public signup(user:User):Observable<User>{
    return this.http.post<User>(`${this.url}/user/signUp`,user);
   }
   public getCurrentUser():string{
    return this.storage.retrieve("userName")
   }
}
