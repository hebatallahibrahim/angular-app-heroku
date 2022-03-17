import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../Model/product.model';

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
  constructor(
    config: NgbDropdownConfig,
    private cartService: CartService,
    private searchService: SearchService
  ) {
    // customize default values of dropdowns used by this component tree
    config.autoClose = false;
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

  ngOnInit(): void {
    this.cartService.cartHasBeenChanged.subscribe(
      (res) => {
        this.addedProducts = res;
      },
      (err) => {},
      () => {}
    );
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.searchService.search.next(this.searchTerm);
   
  }
}
