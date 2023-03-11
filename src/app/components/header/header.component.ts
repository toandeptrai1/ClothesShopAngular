import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {
  cartItems$:Observable<Product[]>;

  user!: User|null;
  constructor(private userService: UserService,private router:Router,private cartService:CartService) {
    this.userService.user.subscribe(user=>this.user = user)

  }
  ngOnInit(): void {
    this.cartItems$=this.cartService.getCart();


  }
  logout(){
    this.userService.logout();

  }
  navigateProfie(){
    this.router.navigate(['/profile']);

  }



}
