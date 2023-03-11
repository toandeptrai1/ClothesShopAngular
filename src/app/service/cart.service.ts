import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class CartService  {
  cartItems:Product[]=[];
  CartItemSubject: BehaviorSubject<Product[]>;
  totalPrice:BehaviorSubject<number>;




  constructor() {
    this.CartItemSubject=new BehaviorSubject<Product[]>(JSON.parse(localStorage.getItem('cartItems')));

    if(this.CartItemSubject.value!=null) {
      this.cartItems=this.CartItemSubject.value;
      this.totalPrice=new BehaviorSubject<number>(this.getTotalPrice());

    }


  }

  getCart():Observable<Product[]> {
    return this.CartItemSubject.asObservable();
  }
  getTotalPrice$(){
    return this.totalPrice.asObservable();
  }

  addToCart(product:Product,quanty:number){
    if(this.cartItems){
      if(this.cartItems.includes(product)){
        let index=this.cartItems.indexOf(product);
        this.cartItems[index].quantity+=quanty;
        this.cartItems[index].totalPrice=this.cartItems[index].quantity*this.cartItems[index].price;
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        this.CartItemSubject.next(this.cartItems);
        this.totalPrice.next(this.getTotalPrice());

      }
      else{
        product.quantity=quanty;
        product.totalPrice=product.price*product.quantity;
        this.cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        this.CartItemSubject.next(this.cartItems);
        this.totalPrice.next(this.getTotalPrice());




      }
    }





  }
  getTotalPrice():number{
    let totalPrice=0;
    totalPrice=this.cartItems.reduce((total,product) =>total+product.totalPrice,totalPrice);
    return totalPrice;

  }
  removeCartItem(product:Product){
    let index=this.cartItems.indexOf(product);
    if(index>=0){
      this.cartItems.splice(index,1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.CartItemSubject.next(this.cartItems);
      this.totalPrice.next(this.getTotalPrice());
    }

  }
  updateCartItem(product:Product,quantity:number){
    let index=this.cartItems.indexOf(product);
    if(index>=0){
      this.cartItems[index].quantity=quantity;
      this.cartItems[index].totalPrice=this.cartItems[index].quantity*this.cartItems[index].price;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.CartItemSubject.next(this.cartItems);
      this.totalPrice.next(this.getTotalPrice());
    }


  }
  clearCart(){

    localStorage.removeItem('cartItems');
    this.CartItemSubject.next(null);
    this.totalPrice.next(null);
    this.cartItems=[];


  }


}
