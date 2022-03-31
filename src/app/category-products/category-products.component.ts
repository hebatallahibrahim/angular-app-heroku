import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Product } from '../Model/product.model';
import { HomeService } from '../Service/home.service';
import { ProductListService } from '../Service/product-list.service';
import { WishlistService } from '../Service/wishlist.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'],
})
export class CategoryProductsComponent implements OnInit {
  productArray!: Product[];
  productArraySlice: Product[] = [];
  likedProducts: any[] = [];
  likedProductsSlice: any[] = [];
  categoryId: any;
  categoryName: any;
  isVisible = false;
  isFetching = false;
  productsRow = false;
  productsGrid = true;
  userID=1;
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(
    private _HomeService: HomeService,
    public router: Router,
    private activetedRoute: ActivatedRoute,
    private wishlistService:WishlistService
  ) {
    this.activetedRoute.params.subscribe((params) => {
      this.productArray=[];
      this.productArraySlice=[];
      this.likedProducts=[];
      this.likedProductsSlice=[];
      this.getCategoryData();
      this.paginator?.firstPage();
    });
  }

  ngOnInit(): void {}

  getCategoryData() {
    this.isFetching=true;
    this.categoryId = this.activetedRoute.snapshot.paramMap.get('id'); // get id from url
    this.categoryName = this.activetedRoute.snapshot.paramMap.get('name');

    console.log(this.categoryId);

    this._HomeService
      .getCategoryProducts(this.categoryId)
      .subscribe((data: any) => {
        this.isFetching=false;
        this.productArray = data.message;
        this.getLikedProducts();
        if (this.productArray.length > 9) {
          this.productArraySlice = this.productArray.slice(0, 9);
        } else {
          this.productArraySlice = this.productArray;
        }
        console.log(this.productArray);
      });
  }
  likeProduct(event: any) {
    console.log("hi");
    this.paginator?.firstPage();
    for (let i = 0; i < this.likedProducts.length; i++) {
      if (this.likedProducts[i].id == event.product_id) {
        this.likedProducts[i].heart = event.heart;
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
