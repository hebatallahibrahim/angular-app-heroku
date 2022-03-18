import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Product } from '../Model/product.model';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  cartDetalis: Product[] = [];
  private cartArray: any = [];
  //
  cartHasBeenChanged = new BehaviorSubject<any>([]);
  //
  getProductData(): Observable<any>{
    return this.cartHasBeenChanged.asObservable();
  }
  setProduct(product: any) {
    this.cartDetalis.push(...product);
    this.cartHasBeenChanged.next(product);
  }
  addToCart(product: Product) {
    // console.log(product);
    // if (this.cartArray.includes(product)) {
    //   product.count!++;
    // } else {
    //   this.cartArray.push(product);
    //   return this.cartHasBeenChanged.asObservable();
    // }
    this.cartDetalis.push(product);
    this.cartHasBeenChanged.next(this.cartDetalis);
    this.getTotalAmount();
  }
  getTotalAmount() {
    let grandTotal = 0;
    this.cartDetalis.map((a: any) => {
      grandTotal += a.count;
    });
  }
  removeCatItem(product: any) {
    this.cartDetalis.map((d: any, index: any) => {
      if (product.id == d.id) {
        this.cartDetalis.splice(index, 1);
      }
    });
  }
}
// subject && pehavior subject
// rxjs
