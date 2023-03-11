import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Page } from 'src/app/models/Page';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input()
  totalPages!:number;
  @Input()
  currentPage!:number;

  @Output()
  onPageChange=new EventEmitter<number>();
  constructor(){

  }
  ngOnInit(): void {

  }



}
