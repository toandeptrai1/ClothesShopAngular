import { Category } from './../models/Category';
import { ProductService } from './../service/product.service';
import { Page } from './../models/Page';
import { BehaviorSubject, delay, map, Observable, of, switchMap, pluck, debounceTime, takeWhile, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../service/category.service';

import { ApiResponse } from '../models/ApiResponse';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../models/Product';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories$!:Observable<Category[]>;
  responseSubject=new BehaviorSubject<ApiResponse<Page>|null>(null);
  apiResponse$!:Observable<ApiResponse<Page>|null>;
  currentPageSubject=new BehaviorSubject<number>(0);
  currenPage$=this.currentPageSubject.asObservable();
  categoryId!:number;
  searchForm:FormGroup;
  searchSubject=new BehaviorSubject<string>("");
  cartItems$:Observable<Product[]>;
  cartItems:Product[];



  constructor(private router: Router, private categoryService: CategoryService
    ,private activatedRoute:ActivatedRoute,private cartService:CartService
    ,private productService:ProductService) {



  }

  ngOnInit(): void {
   this.cartItems$=this.cartService.getCart();
   




    this.categories$=this.categoryService.getCategories();
    this.apiResponse$=this.responseSubject.asObservable();
    this.categoryId=Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.categoryId){
      this.handlePageByCategory(this.categoryId)

    }else{
      this.getProducts();
    }
    this.searchForm=new FormGroup({
      search:new FormControl("")
    })
    this.searchForm.valueChanges.pipe(
      debounceTime(1500),


    ).subscribe(data =>{



      this.searchSubject.next(data.search);
      this.currentPageSubject.next(0);
      this.getProducts();
    })



  }
  public getProducts(){
    this.apiResponse$=this.productService.getProducts({page:this.currentPageSubject.value,size:4,productName:this.searchSubject.value}).pipe(
      delay(1500),
      map((response)=>{
        this.responseSubject.next(response);
        this.currentPageSubject.next(response.data.page.number);
        return response;
      })

  )

  }
  public getProductsByCategory(categoryId:number,page:number){
    this.categoryId=categoryId;


    this.apiResponse$= this.productService.getProductsByCategory({page:page,size:4,categoryId:categoryId}).pipe(
      delay(1500),

      map((response)=>{
        this.responseSubject.next(response);
        this.currentPageSubject.next(response.data.page.number);
        return response;
      })

    )

  }
  handlePageByCategory(categoryId:number,page:number=0){
    this.getProductsByCategory(categoryId,page);


  }
  onPageChange(currentPage: number) {

    this.currentPageSubject.next(currentPage);
    if(this.categoryId){
      this.getProductsByCategory(this.categoryId,this.currentPageSubject.value)


    }else{
      this.getProducts();

    }
  }

  addToCart(product:Product){

   this.cartService.addToCart(product,1);

   this.cartItems$.subscribe(data =>console.log(data));




  }




}
