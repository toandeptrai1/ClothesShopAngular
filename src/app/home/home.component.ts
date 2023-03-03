import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Category } from '../models/Category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories$!:Observable<Category[]>;
  constructor(private router: Router, private categoryService: CategoryService) {


  }

  ngOnInit(): void {
    this.categories$=this.categoryService.getCategories();
  
  }


}
