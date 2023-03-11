import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product$:Observable<Product>;
  productId:number;
  constructor(private productService: ProductService,private activedRoute: ActivatedRoute) {


  }
  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {this.productId=params['id']});
    this.product$=this.productService.getProduct(this.productId);

  }


}
