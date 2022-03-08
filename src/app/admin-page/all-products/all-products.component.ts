import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  arr = [1,2,3,4,5,6,7,8,9,10];
  arr2 = [1,2,3,4,5,6,7,8,9,10];
  constructor() { }
  ngOnInit(): void {
  }
}
