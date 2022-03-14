import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  productArray = [
    {
      id: 1,
      name: 'bed',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
      Count: 1,
    },
    {
      id: 2,
      name: 'chair',
      price: 1500,
      imageUrl: 'https://picsum.photos/200',
      Count: 1,
    },
    {
      id: 3,
      name: 'table',
      price: 1800,
      imageUrl: 'https://picsum.photos/200',
      Count: 1,
    },
    {
      id: 4,
      name: 'productname',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
      Count: 1,
    },
    {
      id: 5,
      name: 'productname',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
      Count: 1,
    },
    {
      id: 6,
      name: 'productname',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
      Count: 1,
    },
  ];
  private cartArray: Product[] = [];
  //
  cartHasBeenChanged: EventEmitter<Product[]> = new EventEmitter<Product[]>();
  //
  constructor(public _HttpClient: HttpClient) {}
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

  getAllProduct() {
    return this.productArray.splice(0);
  }
  getProductByID() {}
  addProduct() {}
  updateProduct() {
    return this._HttpClient.get(
      'https://api.themoviedb.org/3/trending/all/day?api_key=1fe5230244d851b01f7c30b329d0412c'
    );
  }
  deleteProduct() {}
}
