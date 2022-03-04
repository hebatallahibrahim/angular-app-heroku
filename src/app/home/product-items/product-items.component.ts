import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css']
})
export class ProductItemsComponent implements OnInit {
  arr = [1,2,3,4];
  constructor() { }

  ngOnInit(): void {
  }

}
