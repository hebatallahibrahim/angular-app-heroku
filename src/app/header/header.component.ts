import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../Model/product.model';
import { HomeService } from 'src/app/Service/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../Service/cart.service';
import { SearchService } from './../Service/search.service';
import { Subject } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { ProductCartService } from '../Service/productCart.service';

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
  addedProducts: any[] = [];
  categoryArray: any[] = [];
  categoryId: any;
  categoryName: any;
  cartCounter: number = 0;
  togle: string = 'ngbDropdownToggle';
  searchbtn = true;
  totalAmount: any = 0;
  @Output() searchEvent = new EventEmitter<any>();

  constructor(
    config: NgbDropdownConfig,
    private cartService: CartService,
    public _HomeService: HomeService,
    public searchService: SearchService,
    public _Router: Router,
    private activetedRoute: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
    private productCartService: ProductCartService
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
    // this.primengConfig.ripple = true;
    // debugger;
    // this.cartService.cartHasBeenChanged.subscribe((res: any[]) => {
    //   this.addedProducts = res;
    //   this.cartCounter = res.length;
    //   this.totalAmount = this.cartService.getTotalAmount();
    //   //   console.log(res);
    // });

    // this.addedProducts = this.cartService.getCartDetails();
    // this.totalAmount = this.calculateTotal();
    // this.cartCounter = this.totalAmountNow();

    this._HomeService.getAllCategories().subscribe(
      (res) => {
        this.categoryArray = res.category;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  dropdownOpen() {
    this.accountDropdown = true;
  }

  calculateTotal(): any {
    debugger;
    return this.productCartService.totalPrice();
  }
  totalAmountNow(): any {
    return this.productCartService.getTotalAmount();
  }
  openCart() {
    this.visibleSidebar2 = true;
    this.addedProducts = this.productCartService.getProducts();
  }
  removeItem(item: Product): void {
    this.productCartService.removeProduct(item);
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
