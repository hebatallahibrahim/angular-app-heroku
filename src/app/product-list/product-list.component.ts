import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from '../Model/product.model';
import { ProductListService } from '../Service/product-list.service';
import { WishlistService } from '../Service/wishlist.service';
import { SearchService } from './../Service/search.service';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productArray: Product[] = [];
  productArraySlice: Product[] = [];
  sortedProductArray: Product[] = [];
  mainProductArray: Product[] = [];
  searchKey: string = '';
  productItem!: Product;
  imagUrlProduct: string = 'http://127.0.0.1:8000/uploads/product/';
  mainLikedProducts: any[] = [];
  likedProducts: any[] = [];
  sortedLikedProducts: any[] = [];
  likedProductsSlice: any[] = [];
  userID = 1;
  closeResult = '';
  colorSearchFilter = '';
  priceSearchFilter = '';
  nameSearch = '';
  categorySearchFilterID = 0;
  subcatSearchFilterID = 0;

  productsRow = false;
  productsGrid = true;
  count = 0;
  isVisible = false;
  isFetching = false;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private productListService: ProductListService,
    private searchService: SearchService,
    private wishlistService: WishlistService,
    private activatedRoute: ActivatedRoute,
    private primengConfig: PrimeNGConfig
  ) {
    this.activatedRoute.params.subscribe((params) => {});
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.isFetching=true;
    this.productListService.getAllProduct().subscribe(
      (result) => {
        this.isFetching=false;
        this.productArray = result.products;
        this.productArray.forEach((a: any) => {
          Object.assign(a, { quantity: 1, totalPrice: a.selling_price });
        });
        this.mainProductArray = result.products;
        this.getLikedProducts();
        if (this.productArray.length > 9) {
          this.productArraySlice = this.productArray.slice(0, 9);
        } else {
          this.productArraySlice = this.productArray;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  likeProduct(event: any) {
    this.paginator.firstPage();
    for (let i = 0; i < this.likedProducts.length; i++) {
      if (this.likedProducts[i].id == event.product_id) {
        this.likedProducts[i].heart = event.heart;
      }
    }
    for (let i = 0; i < this.mainLikedProducts.length; i++) {
      if (this.mainLikedProducts[i].id == event.product_id) {
        this.mainLikedProducts[i].heart = event.heart;
      }
    }
    if (this.productArray.length > 9) {
      this.productArraySlice = this.productArray.slice(0, 9);
    } else {
      this.productArraySlice = this.productArray;
    }
    window.scrollTo(0, 0);
    this.isVisible = true;
    setTimeout(() => (this.isVisible = false), 3500);
  }
  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.productArray.length) {
      endIndex = this.productArray.length;
    }
    this.productArraySlice = this.productArray.slice(startIndex, endIndex);
    this.likedProductsSlice = this.likedProducts.slice(startIndex, endIndex);
  }
  onchangeColorFilter(event: any) {
    this.paginator.firstPage();
    this.productArray = this.mainProductArray;
    this.likedProducts = [...this.mainLikedProducts];
    this.sortedLikedProducts = [];
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
          (a, b) =>
            a.selling_price -
            +a.discount_price -
            (b.selling_price - +b.discount_price)
        );
      } else if (this.priceSearchFilter == 'Highest To Lowest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) =>
            b.selling_price -
            +b.discount_price -
            (a.selling_price - +a.discount_price)
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
    for (let i = 0; i < this.productArray.length; i++) {
      if (
        this.likedProducts.some(
          (e: { id: number; heart: boolean }) =>
            e.id == this.productArray[i].id && e.heart == true
        )
      ) {
        this.sortedLikedProducts.push({
          id: this.productArray[i].id,
          heart: true,
        });
      }
      if (
        this.likedProducts.some(
          (e: { id: number; heart: boolean }) =>
            e.id == this.productArray[i].id && e.heart == false
        )
      ) {
        this.sortedLikedProducts.push({
          id: this.productArray[i].id,
          heart: false,
        });
      }
    }
    this.likedProducts = [...this.sortedLikedProducts];
    if (this.productArray.length > 9) {
      this.productArraySlice = this.productArray.slice(0, 9);
    } else {
      this.productArraySlice = this.productArray;
    }
    if (this.likedProducts.length > 9) {
      this.likedProductsSlice = this.likedProducts.slice(0, 9);
    } else {
      this.likedProductsSlice = this.likedProducts;
    }
  }

  onchangeCategoryFilter(event: any) {
    this.paginator.firstPage();
    this.productArray = this.mainProductArray;
    this.likedProducts = [...this.mainLikedProducts];
    this.sortedLikedProducts = [];
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
          (a, b) =>
            a.selling_price -
            +a.discount_price -
            (b.selling_price - +b.discount_price)
        );
      } else if (this.priceSearchFilter == 'Highest To Lowest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) =>
            b.selling_price -
            +b.discount_price -
            (a.selling_price - +a.discount_price)
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
    for (let i = 0; i < this.productArray.length; i++) {
      if (
        this.likedProducts.some(
          (e: { id: number; heart: boolean }) =>
            e.id == this.productArray[i].id && e.heart == true
        )
      ) {
        this.sortedLikedProducts.push({
          id: this.productArray[i].id,
          heart: true,
        });
      }
      if (
        this.likedProducts.some(
          (e: { id: number; heart: boolean }) =>
            e.id == this.productArray[i].id && e.heart == false
        )
      ) {
        this.sortedLikedProducts.push({
          id: this.productArray[i].id,
          heart: false,
        });
      }
    }
    this.likedProducts = [...this.sortedLikedProducts];
    if (this.productArray.length > 9) {
      this.productArraySlice = this.productArray.slice(0, 9);
    } else {
      this.productArraySlice = this.productArray;
    }
    if (this.likedProducts.length > 9) {
      this.likedProductsSlice = this.likedProducts.slice(0, 9);
    } else {
      this.likedProductsSlice = this.likedProducts;
    }
  }

  onchangeSubCatFilter(event: any) {
    this.paginator.firstPage();
    this.productArray = this.mainProductArray;
    this.likedProducts = [...this.mainLikedProducts];
    this.sortedLikedProducts = [];
    if (event.subcategory_id != '') {
      this.productArray = this.productArray.filter(
        (x) => x.sub_category_id == event.subcategory_id
      );
      this.subcatSearchFilterID = event.subcategory_id;
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
          (a, b) =>
            a.selling_price -
            +a.discount_price -
            (b.selling_price - +b.discount_price)
        );
      } else if (this.priceSearchFilter == 'Highest To Lowest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) =>
            b.selling_price -
            +b.discount_price -
            (a.selling_price - +a.discount_price)
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
    for (let i = 0; i < this.productArray.length; i++) {
      if (
        this.likedProducts.some(
          (e: { id: number; heart: boolean }) =>
            e.id == this.productArray[i].id && e.heart == true
        )
      ) {
        this.sortedLikedProducts.push({
          id: this.productArray[i].id,
          heart: true,
        });
      }
      if (
        this.likedProducts.some(
          (e: { id: number; heart: boolean }) =>
            e.id == this.productArray[i].id && e.heart == false
        )
      ) {
        this.sortedLikedProducts.push({
          id: this.productArray[i].id,
          heart: false,
        });
      }
    }
    this.likedProducts = [...this.sortedLikedProducts];
    if (this.productArray.length > 9) {
      this.productArraySlice = this.productArray.slice(0, 9);
    } else {
      this.productArraySlice = this.productArray;
    }
    if (this.likedProducts.length > 9) {
      this.likedProductsSlice = this.likedProducts.slice(0, 9);
    } else {
      this.likedProductsSlice = this.likedProducts;
    }
  }

  onchangePriceFilter(event: any) {
    this.paginator.firstPage();
    this.productArray = this.mainProductArray;
    this.likedProducts = [...this.mainLikedProducts];
    this.sortedLikedProducts = [];
    if (event.priceorder != '') {
      if (event.priceorder == 'Lowest To Highest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) =>
            a.selling_price -
            +a.discount_price -
            (b.selling_price - +b.discount_price)
        );
      } else if (event.priceorder == 'Highest To Lowest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) =>
            b.selling_price -
            +b.discount_price -
            (a.selling_price - +a.discount_price)
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
    for (let i = 0; i < this.productArray.length; i++) {
      if (
        this.likedProducts.some(
          (e: { id: number; heart: boolean }) =>
            e.id == this.productArray[i].id && e.heart == true
        )
      ) {
        this.sortedLikedProducts.push({
          id: this.productArray[i].id,
          heart: true,
        });
      }
      if (
        this.likedProducts.some(
          (e: { id: number; heart: boolean }) =>
            e.id == this.productArray[i].id && e.heart == false
        )
      ) {
        this.sortedLikedProducts.push({
          id: this.productArray[i].id,
          heart: false,
        });
      }
    }
    this.likedProducts = [...this.sortedLikedProducts];
    if (this.productArray.length > 9) {
      this.productArraySlice = this.productArray.slice(0, 9);
    } else {
      this.productArraySlice = this.productArray;
    }
    if (this.likedProducts.length > 9) {
      this.likedProductsSlice = this.likedProducts.slice(0, 9);
    } else {
      this.likedProductsSlice = this.likedProducts;
    }
  }

  getProductsByName(event: any) {
    this.paginator.firstPage();
    this.productArray = this.mainProductArray;
    this.likedProducts = [...this.mainLikedProducts];
    this.sortedLikedProducts = [];
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
          (a, b) =>
            a.selling_price -
            +a.discount_price -
            (b.selling_price - +b.discount_price)
        );
      } else if (this.priceSearchFilter == 'Highest To Lowest Price') {
        this.productArray = [...this.productArray].sort(
          (a, b) =>
            b.selling_price -
            +b.discount_price -
            (a.selling_price - +a.discount_price)
        );
      }
    }
    for (let i = 0; i < this.productArray.length; i++) {
      if (
        this.likedProducts.some(
          (e: { id: number; heart: boolean }) =>
            e.id == this.productArray[i].id && e.heart == true
        )
      ) {
        this.sortedLikedProducts.push({
          id: this.productArray[i].id,
          heart: true,
        });
      }
      if (
        this.likedProducts.some(
          (e: { id: number; heart: boolean }) =>
            e.id == this.productArray[i].id && e.heart == false
        )
      ) {
        this.sortedLikedProducts.push({
          id: this.productArray[i].id,
          heart: false,
        });
      }
    }
    this.likedProducts = [...this.sortedLikedProducts];
    if (this.productArray.length > 9) {
      this.productArraySlice = this.productArray.slice(0, 9);
    } else {
      this.productArraySlice = this.productArray;
    }
    if (this.likedProducts.length > 9) {
      this.likedProductsSlice = this.likedProducts.slice(0, 9);
    } else {
      this.likedProductsSlice = this.likedProducts;
    }
  }

  getAllProducts() {
    this.paginator.firstPage();
    this.colorSearchFilter = '';
    this.priceSearchFilter = '';
    this.categorySearchFilterID = 0;
    this.subcatSearchFilterID = 0;
    this.productArray = this.mainProductArray;
    this.likedProducts = [...this.mainLikedProducts];
    this.sortedLikedProducts = [];
    if (this.nameSearch != '') {
      this.productArray = this.productArray.filter(
        (x) =>
          x.name.trim().toLowerCase().search(this.nameSearch) != -1 ||
          x.color.trim().toLowerCase().search(this.nameSearch) != -1
      );
    }
    for (let i = 0; i < this.productArray.length; i++) {
      if (
        this.likedProducts.some(
          (e: { id: number; heart: boolean }) =>
            e.id == this.productArray[i].id && e.heart == true
        )
      ) {
        this.sortedLikedProducts.push({
          id: this.productArray[i].id,
          heart: true,
        });
      }
      if (
        this.likedProducts.some(
          (e: { id: number; heart: boolean }) =>
            e.id == this.productArray[i].id && e.heart == false
        )
      ) {
        this.sortedLikedProducts.push({
          id: this.productArray[i].id,
          heart: false,
        });
      }
    }
    this.likedProducts = [...this.sortedLikedProducts];
    if (this.productArray.length > 9) {
      this.productArraySlice = this.productArray.slice(0, 9);
    } else {
      this.productArraySlice = this.productArray;
    }
    if (this.likedProducts.length > 9) {
      this.likedProductsSlice = this.likedProducts.slice(0, 9);
    } else {
      this.likedProductsSlice = this.likedProducts;
    }
  }

  getLikedProducts() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('user_id', this.userID);
    this.wishlistService.getWishlistProducts(queryParams).subscribe(
      (res) => {
        for (let i = 0; i < this.productArray.length; i++) {
          if (
            res.products.some(
              (e: { product_id: number; user_id: number }) =>
                e.product_id == this.productArray[i].id &&
                e.user_id == this.userID
            )
          ) {
            this.likedProducts.push({
              id: this.productArray[i].id,
              heart: true,
            });
          } else {
            this.likedProducts.push({
              id: this.productArray[i].id,
              heart: false,
            });
          }
        }

        this.mainLikedProducts = [...this.likedProducts];
        if (this.likedProducts.length > 9) {
          this.likedProductsSlice = this.likedProducts.slice(0, 9);
        } else {
          this.likedProductsSlice = this.likedProducts;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
