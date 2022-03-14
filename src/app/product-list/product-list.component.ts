import { Component, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../Model/product.model';
import { ProductListService } from '../Service/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productArray!: Product[];
  // itemAdd: EventEmitter<Product> = new EventEmitter<Product>();
  constructor(private productListService: ProductListService) {
    this.productArray = this.productListService.productArray;
  }

  ngOnInit(): void {}
}
