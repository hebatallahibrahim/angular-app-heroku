import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../Model/product.model';
import { HomeService } from 'src/app/Service/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './../Service/search.service';
import { Subject, Observable } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { ProductCartService } from '../Service/productCart.service';
import { HttpParams } from '@angular/common/http';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbDropdownConfig],
})
export class HeaderComponent implements OnInit {
  visibleSidebar2: any;
  searchTerm: string = '';
  accountDropdown = false;
  imagUrlProduct: string = 'http://127.0.0.1:8000/uploads/product/';
  addedProducts: any = [];
  categoryArray: any[] = [];
  categoryId: any;
  categoryName: any;
  cartCounter: any = 0;
  totalAmount: any = 0;
  togle: string = 'ngbDropdownToggle';
  searchbtn = true;
  userID = 1;

  @Output() searchEvent = new EventEmitter<any>();

  constructor(
    config: NgbDropdownConfig,
    public _HomeService: HomeService,
    public searchService: SearchService,
    public _Router: Router,
    private productCartService: ProductCartService,
    private cartService: CartService
  ) {
    // customize default values of dropdowns used by this component tree
    config.autoClose = false;
    if (_Router.url == '/product-list') {
      this.searchbtn = false;
    } else {
      this.searchbtn = true;
    }
  }

  ngOnInit(): void {
    this.cartService.getApiCart();
    this.cartService.cartHasBeenChanged.subscribe({
      next: (res) => {
        this.addedProducts = res;
        let counter = 0,
          amount = 0,
          lastprice = 0,
          total = 0;
        this.addedProducts.forEach((element: any) => {
          counter += element.count;
          if (element.discount || element.count++) {
            lastprice = element.price - element.discount;
            amount = lastprice * element.count;
            total += amount;
          } else {
            amount = element.price * element.count;
            total += amount;
          }
        });
        this.cartCounter = counter;
        this.totalAmount = total;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });

    this._HomeService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryArray = res.category;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  getCart() {
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append('user_id', this.userID);
    // this.productCartService.getCart(queryParams).subscribe((res: any) => {
    //   this.categoryId = res.Cart;
    //   if (this.categoryId) {
    //     this.categoryId.forEach((item: any) => {
    //       this.cartCounter += item['count'];
    //       console.log(this.cartCounter);
    //     });
    //   }
    // });
  }
  dropdownOpen() {
    this.accountDropdown = true;
  }

  calculateTotal(): any {
    return this.productCartService.totalPrice();
  }
  totalAmountNow(): any {
    console.log(this.addedProducts);
    return this.productCartService.getTotalAmount();
  }
  openCart() {
    this.visibleSidebar2 = true;
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append('user_id', this.userID);
    // return this.productCartService.getCart(queryParams).subscribe({
    //   next: (res: any) => {
    //     this.addedProducts = res.Cart;
    //     console.log(this.addedProducts);
    //     if (this.addedProducts.length != 0) {
    //       this.cartCounter = true;
    //     }
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   },
    //   complete: () => {},
    // });
  }
  removeItem(item: any) {
    this.cartService.deleteCartItem(item, {
      user_id: this.userID,
    });
  }

  goToCategoryProducts(categoryItem: any) {
    this._Router.navigate([
      '/category-products',
      categoryItem.id,
      categoryItem.name,
    ]); // send id to url
  }
  search(searchname: any) {
    console.log(searchname);
    this.searchEvent.emit({ searchword: searchname });
  }

  goToProductList() {
    this._Router.navigate(['/product-list']);
  }
}
