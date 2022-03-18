import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../Model/product.model';
import { HomeService } from 'src/app/Service/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../Service/cart.service';
import { SearchService } from './../Service/search.service';
import { Subject } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';

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
  addedProducts: Product[] = [];
  categoryArray: any[] = [];
  productArray!: Product[];
  categoryId: any;
  categoryName: any;
  cartCounter: number = 0;
  togle: string = 'ngbDropdownToggle';

  constructor(
    config: NgbDropdownConfig,
    private cartService: CartService,
    public _HomeService: HomeService,
    public searchService: SearchService,
    public _Router: Router,
    private activetedRoute: ActivatedRoute,
    private primengConfig: PrimeNGConfig
  ) {
    // customize default values of dropdowns used by this component tree
    config.autoClose = false;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.cartService.cartHasBeenChanged.subscribe((res: Product[]) => {
      this.cartCounter = res.length;
      console.log(res);
    });
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

  calculateTotal(): number {
    let totalPrice = 0;
    this.addedProducts.forEach((element) => {
      totalPrice += element.count! * element.selling_price;
    });
    return totalPrice;
  }
  removeItem(item: Product): void {
    this.addedProducts.splice(this.addedProducts.indexOf(item), 1);
  }

  goToCategoryProducts(categoryItem: any) {
    this._Router.navigate([
      '/category-products',
      categoryItem.id,
      categoryItem.name,
    ]); // send id to url
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.searchService.search.next(this.searchTerm);
  }
}
