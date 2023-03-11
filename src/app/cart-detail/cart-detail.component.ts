import { Product } from 'src/app/models/Product';
import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  cart$:Observable<Product[]>
  totalPrice$:Observable<number>;

  constructor(private cartService: CartService,private toastr:ToastrService) {

  }

  ngOnInit(): void {
    this.cart$=this.cartService.getCart();
    this.totalPrice$=this.cartService.getTotalPrice$();

  }
  removeCartItem(product:Product) {
    this.cartService.removeCartItem(product);

  }
  updateCartitem(product:Product,event:any) {
    let quantity=event.target.value;
    if(quantity>0){
      this.cartService.updateCartItem(product,quantity);
    }
    else{
      this.toastr.error("Bạn phải nhập số lượng!")

    }

  }


}
