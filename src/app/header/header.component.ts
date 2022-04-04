import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../Model/product.model';
import { HomeService } from 'src/app/Service/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './../Service/search.service';
import { Subject, Observable } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { HttpParams } from '@angular/common/http';
import { CartService } from 'src/app/Service/cart.service';
import { AuthenticationService } from '../Service/authentication.service';

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
  userID: any;
  //  auth protection
  loggedIn: boolean = false;
  signOutEvent = new EventEmitter<any>();
  @Output() searchEvent = new EventEmitter<any>();

  constructor(
    config: NgbDropdownConfig,
    public _HomeService: HomeService,
    public searchService: SearchService,
    public _Router: Router,
    private cartService: CartService,
    private auth: AuthenticationService
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
    const user: any = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userID = userObj.user.id;
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
    } else {
      console.log('header not have user');
    }
    this._HomeService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryArray = res.category;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });

    //  auth protection
    this.auth.status().subscribe(
      (res) => {
        this.loggedIn = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  dropdownOpen() {
    this.accountDropdown = true;
  }

  openCart() {
    this.visibleSidebar2 = true;
  }
  removeItem(item: any) {
    const user: any = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userID = userObj.user.id;
      this.cartService.deleteCartItem(item, {
        user_id: this.userID,
      });
    } else {
      console.log('user not logged in yet');
    }
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
  signout() {
    debugger;
    this.cartService.getApiCart();
    this.cartService.cartHasBeenChanged.subscribe({
      next: (res) => {
        this.addedProducts = [];
        this.signOutEvent.emit(this.addedProducts);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
