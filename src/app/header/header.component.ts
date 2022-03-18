import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../Model/product.model';
import { HomeService } from 'src/app/Service/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../Service/cart.service';
import { SearchService } from './../Service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbDropdownConfig],
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  accountDropdown = false;
  addedProducts: Product[] = [];
  togle: string = 'ngbDropdownToggle';
  searchbtn=true;

  @Output() searchEvent = new EventEmitter<any>();

  constructor(
    config: NgbDropdownConfig,
    private cartService: CartService,
    public _HomeService: HomeService,
    public searchService: SearchService,
    public _Router: Router,
    private activetedRoute: ActivatedRoute
  ) {
    // customize default values of dropdowns used by this component tree
    config.autoClose = false;
    if(_Router.url=='/product-list'){
      this.searchbtn=false;
    }else{
      this.searchbtn=true;
    }
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

  categoryArray: any[] = [];
  productArray!: Product[];
  categoryId: any;
  categoryName: any;

  ngOnInit(): void {
    this.cartService.cartHasBeenChanged.subscribe(
      (res) => {
        this.addedProducts = res;
      },
      (err) => {},
      () => {}
    );

    this._HomeService.getAllCategories().subscribe(
      (res) => {
        this.categoryArray = res.category;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  goToCategoryProducts(categoryItem: any) {
    this._Router.navigate([
      '/category-products',
      categoryItem.id,
      categoryItem.name,
    ]); // send id to url
  }
  search(searchname:any) {
    console.log(searchname);
    this.searchEvent.emit({ searchword: searchname});
  }

  goToProductList(){
    this._Router.navigate(['/product-list']);
  }
}
