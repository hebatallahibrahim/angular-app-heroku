import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../Model/product.model';
import { ProductListService } from '../Service/product-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbDropdownConfig ],
 
})
export class HeaderComponent implements OnInit {
  accountDropdown = false;
  addedProducts: Product[] = [];
  togle: string = 'ngbDropdownToggle';
  constructor(
    config: NgbDropdownConfig,
    private productListService: ProductListService
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
      totalPrice += element.Count * element.price;
    });
    return totalPrice;
  }
  removeItem(item: Product): void {
    // delete this.addedProducts[0]
    // this.addedProducts.pop();
    this.addedProducts.splice(this.addedProducts.indexOf(item), 1);
  }

  ngOnInit(): void {
    this.productListService.cartHasBeenChanged.subscribe(
      (res) => {
        this.addedProducts = res;
      },
      (err) => {},
      () => {}
    );
  }
}
