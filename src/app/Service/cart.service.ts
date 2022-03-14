import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../Model/product.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  private cartArray: Product[] = [];
  //
  cartHasBeenChanged: EventEmitter<Product[]> = new EventEmitter<Product[]>();
  //
  addToCart(product: Product) {
    console.log(product);
    if (this.cartArray.includes(product)) {
      product!.Count++;
    } else {
      this.cartArray.push(product);
      console.log(this.cartArray);
      this.cartHasBeenChanged.emit(this.cartArray);
    }
  }
}
