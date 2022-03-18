import { Component, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../Model/product.model';
import { ProductListService } from '../Service/product-list.service';
import { SearchService } from './../Service/search.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productArray: Product[] = [];
  mainProductArray: Product[] = [];
  searchKey: string = '';
  productItem!: Product;
  imagUrlProduct: string = 'http://127.0.0.1:8000/uploads/product/';

  item_hearted = false;
  closeResult = '';

  constructor(
    private productListService: ProductListService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.productListService.getAllProduct().subscribe(
      (result) => {
        console.log(result);

        this.productArray = result.products;
        this.productArray.forEach((a: any) => {
          Object.assign(a, { quantity: 1, totalPrice: a.selling_price });
        });
        this.mainProductArray = result.products;
      },
      (err) => {
        console.log(err);
      }
    );
    this.searchService.search.subscribe(
      (val: any) => {
        this.searchKey = val;
        console.log(this.searchKey);

        this.productArray = this.productArray.filter(
          (x) =>
            x.name.includes(this.searchKey) || x.color.includes(this.searchKey)
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onchangeFilter(event: any) {
    if (event.eventType == 'color') {
      this.productArray = this.productArray.filter((x) => x.color == event.id);
    } else if (event.eventType == 'category_id') {
      this.productArray = this.productArray.filter(
        (x) => x.category_id == event.id
      );
    } else if (event.eventType == 'sub_category_id') {
      this.productArray = this.productArray.filter(
        (x) => x.sub_category_id == event.id
      );
      console.log(this.productArray);
      console.log(event.id);
      console.log(event);
      console.log(this.productArray);
    }
  }
  clearFelter() {
    this.productArray = this.mainProductArray;
  }
}
