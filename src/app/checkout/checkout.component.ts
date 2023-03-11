import { District } from './../models/District';
import { Province } from './../models/Province';
import { Product } from 'src/app/models/Product';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Observable } from 'rxjs';
import { ProvinceService } from '../service/province.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  carts$:Observable<Product[]>;
  totalPrice$:Observable<number>;
  provinces$:Observable<Province[]>;
  province$:Observable<Province>;
  district$:Observable<District>;
  checkoutForm:FormGroup;
  submitted = false;


  constructor(private cartService: CartService,private provinceService:ProvinceService,private router:Router) {
    this.checkoutForm=new FormGroup({
      fullName:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.email,Validators.required]),
      phone:new FormControl('',Validators.required),
      province:new FormControl('',Validators.required),
      district:new FormControl('',Validators.required),
      ward:new FormControl('',Validators.required)
    })

  }



  ngOnInit(): void {
    this.carts$=this.cartService.getCart();
    this.totalPrice$=this.cartService.getTotalPrice$();
    this.provinces$=this.provinceService.getProvices();


  }
  provinceChange(e:any){
   let provinceCode=e.target.value;
   if(provinceCode>0){
    this.province$=this.provinceService.getProviceByCode(provinceCode);

   }
  }
  getWards(e:any){
    let districtCode=e.target.value;
    if(districtCode>0){
      this.district$=this.provinceService.getDistrictByCode(districtCode);

    }
  }
  onSubmit(){
    this.submitted = true;

    if(this.checkoutForm.valid){
     this.cartService.clearCart();
     this.router.navigateByUrl("/cartdetail");
    }
  }


}
