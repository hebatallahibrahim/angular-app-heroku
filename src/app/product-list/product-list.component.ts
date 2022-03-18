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
  sortedProductArray: Product[] = [];
  mainProductArray: Product[] = [];
  searchKey: string = '';
  productItem!: Product;
  imagUrlProduct: string = 'http://127.0.0.1:8000/uploads/product/';

  item_hearted = false;
  closeResult = '';
  colorSearchFilter = '';
  priceSearchFilter = '';
  nameSearch = '';
  categorySearchFilterID = 0;
  subcatSearchFilterID = 0;

  constructor(
    private productListService: ProductListService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.productListService.getAllProduct().subscribe(
      (result) => {
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
  }

  onchangeColorFilter(event: any) {
    this.productArray = this.mainProductArray;
    if (event.colorname != '') {
      this.productArray = this.productArray.filter(
        (x) =>
          x.color.trim().toLowerCase() == event.colorname.trim().toLowerCase()
      );
      this.colorSearchFilter = event.colorname.trim().toLowerCase();
    } else {
      this.colorSearchFilter = '';
    }

    if (this.categorySearchFilterID != 0) {
      this.productArray = this.productArray.filter(
        (x) => x.category_id == this.categorySearchFilterID
      );
    }
    if (this.subcatSearchFilterID != 0) {
      this.productArray = this.productArray.filter(
        (x) => x.sub_category_id == this.subcatSearchFilterID
      );
    }
    if (this.priceSearchFilter != '') {
      if (this.priceSearchFilter == 'Lowest To Highest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) => a.selling_price - b.selling_price
        );
      } else if (this.priceSearchFilter == 'Highest To Lowest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) => b.selling_price - a.selling_price
        );
      }
    }
    if (this.nameSearch != '') {
      this.productArray = this.productArray.filter(
        (x) =>
          x.name.trim().toLowerCase().search(this.nameSearch) != -1 ||
          x.color.trim().toLowerCase().search(this.nameSearch) != -1
      );
    }
  }

  onchangeCategoryFilter(event: any) {
    this.productArray = this.mainProductArray;
    if (event.category_id != '') {
      this.productArray = this.productArray.filter(
        (x) => x.category_id == event.category_id
      );
      this.categorySearchFilterID = event.category_id;
    } else {
      this.categorySearchFilterID = 0;
    }
    if (this.colorSearchFilter != '') {
      this.productArray = this.productArray.filter(
        (x) => x.color.trim().toLowerCase() == this.colorSearchFilter
      );
    }
    if (this.subcatSearchFilterID != 0) {
      this.productArray = this.productArray.filter(
        (x) => x.sub_category_id == this.subcatSearchFilterID
      );
    }
    if (this.priceSearchFilter != '') {
      if (this.priceSearchFilter == 'Lowest To Highest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) => a.selling_price - b.selling_price
        );
      } else if (this.priceSearchFilter == 'Highest To Lowest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) => b.selling_price - a.selling_price
        );
      }
    }
    if (this.nameSearch != '') {
      console.log(this.nameSearch);
      this.productArray = this.productArray.filter(
        (x) =>
          x.name.trim().toLowerCase().search(this.nameSearch) != -1 ||
          x.color.trim().toLowerCase().search(this.nameSearch) != -1
      );
    }
  }

  onchangeSubCatFilter(event: any) {
    this.productArray = this.mainProductArray;
    if (event.subcategory_id != '') {
      this.productArray = this.productArray.filter(
        (x) => x.sub_category_id == event.subcategory_id
      );
      this.subcatSearchFilterID = event.subcategory_id;
      console.log(this.productArray);
    } else {
      this.subcatSearchFilterID = 0;
    }
    if (this.colorSearchFilter != '') {
      this.productArray = this.productArray.filter(
        (x) => x.color.trim().toLowerCase() == this.colorSearchFilter
      );
    }
    if (this.categorySearchFilterID != 0) {
      this.productArray = this.productArray.filter(
        (x) => x.category_id == this.categorySearchFilterID
      );
    }
    if (this.priceSearchFilter != '') {
      if (this.priceSearchFilter == 'Lowest To Highest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) => a.selling_price - b.selling_price
        );
      } else if (this.priceSearchFilter == 'Highest To Lowest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) => b.selling_price - a.selling_price
        );
      }
    }
    if (this.nameSearch != '') {
      this.productArray = this.productArray.filter(
        (x) =>
          x.name.trim().toLowerCase().search(this.nameSearch) != -1 ||
          x.color.trim().toLowerCase().search(this.nameSearch) != -1
      );
    }
  }

  onchangePriceFilter(event: any) {
    this.productArray = this.mainProductArray;
    if (event.priceorder != '') {
      if (event.priceorder == 'Lowest To Highest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) => a.selling_price - b.selling_price
        );
      } else if (event.priceorder == 'Highest To Lowest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) => b.selling_price - a.selling_price
        );
      }
      this.priceSearchFilter = event.priceorder;
    } else {
      this.priceSearchFilter = '';
    }

    if (this.colorSearchFilter != '') {
      this.productArray = this.productArray.filter(
        (x) => x.color.trim().toLowerCase() == this.colorSearchFilter
      );
    }
    if (this.categorySearchFilterID != 0) {
      this.productArray = this.productArray.filter(
        (x) => x.category_id == this.categorySearchFilterID
      );
    }
    if (this.subcatSearchFilterID != 0) {
      this.productArray = this.productArray.filter(
        (x) => x.sub_category_id == this.subcatSearchFilterID
      );
    }
    if (this.nameSearch != '') {
      this.productArray = this.productArray.filter(
        (x) =>
          x.name.trim().toLowerCase().search(this.nameSearch) != -1 ||
          x.color.trim().toLowerCase().search(this.nameSearch) != -1
      );
    }
  }

  getProductsByName(event: any) {
    this.productArray = this.mainProductArray;
    if (event.searchword != '') {
      this.productArray = this.productArray.filter(
        (x) =>
          x.name.trim().toLowerCase().search(event.searchword) != -1 ||
          x.color.trim().toLowerCase().search(event.searchword) != -1
      );
      this.nameSearch = event.searchword;
    } else {
      this.nameSearch = '';
    }

    if (this.colorSearchFilter != '') {
      this.productArray = this.productArray.filter(
        (x) => x.color.trim().toLowerCase() == this.colorSearchFilter
      );
    }
    if (this.categorySearchFilterID != 0) {
      this.productArray = this.productArray.filter(
        (x) => x.category_id == this.categorySearchFilterID
      );
    }
    if (this.subcatSearchFilterID != 0) {
      this.productArray = this.productArray.filter(
        (x) => x.sub_category_id == this.subcatSearchFilterID
      );
    }
    if (this.priceSearchFilter != '') {
      if (this.priceSearchFilter == 'Lowest To Highest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) => a.selling_price - b.selling_price
        );
      } else if (this.priceSearchFilter == 'Highest To Lowest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) => b.selling_price - a.selling_price
        );
      }
    }
  }

  getAllProducts() {
    this.colorSearchFilter = '';
    this.priceSearchFilter = '';
    this.categorySearchFilterID = 0;
    this.subcatSearchFilterID = 0;
    this.productArray = this.mainProductArray;
    if (this.nameSearch != '') {
      this.productArray = this.productArray.filter(
        (x) =>
          x.name.trim().toLowerCase().search(this.nameSearch) != -1 ||
          x.color.trim().toLowerCase().search(this.nameSearch) != -1
      );
    }
  }
}
