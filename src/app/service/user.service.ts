import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = 'http://localhost:8080/api/';
  private userSubject!: BehaviorSubject<User | null>;
  public user!:Observable<User|null>;


  constructor(private http: HttpClient,private router: Router) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user=this.userSubject.asObservable();

   }

   public login(user:User):Observable<User> {

    return this.http.post<User>(`${this.url}/user`,user).pipe(
      map(user=>{
        localStorage.setItem('user',JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );

   }
   public userValue(){
    return this.userSubject.value;

   }
   public logout(){
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);

   }

   public signup(user:User):Observable<User>{
    return this.http.post<User>(`${this.url}/user/signUp`,user);
   }

}
