import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Product } from '../Model/product.model';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  productcount: any = 1;
  cartDetalis: Product[] = [];

  //
  // cartHasBeenChanged = new BehaviorSubject<any>([]);

  //
  getCartDetails() {
    // return this.cartHasBeenChanged.asObservable();
    return this.cartDetalis
  }
  setProduct(product: any) {
    this.cartDetalis.push(...product);
    // this.cartHasBeenChanged.next(product);
  }
  addToCart(product: Product) {
    if (this.cartDetalis.includes(product)) {
      this.productcount = product.status;
      product.status = product.status + 1;
    } else {
      this.cartDetalis.push(product);
      // this.cartHasBeenChanged.next(this.cartDetalis);
    }

   
  }
  getTotalAmount() {
   return this.cartDetalis.length
  }
  totalPrice() {
    let totalPrice = 0;
    this.cartDetalis.forEach((element: Product) => {
      totalPrice += element.status * element.selling_price;
    });
    // this.cartHasBeenChanged.next(this.cartDetalis);
    return totalPrice;
  }
  removeCatItem(product: any) {
    this.cartDetalis.map((d: any, index: any) => {
      if (product.id == d.id) {
        this.cartDetalis.splice(index, 1);
      }
    });
    // this.cartHasBeenChanged.next(this.cartDetalis);
  }
}
// subject && pehavior subject
// rxjs
