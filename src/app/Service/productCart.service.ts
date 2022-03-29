import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../Model/product.model';

@Injectable({ providedIn: 'root' })
export class ProductCartService {
  // Make _ProductsSource private so it's not accessible from the outside,
  // expose it as Products$ observable (read-only) instead.
  // Write to _ProductsSource only through specified store methods below.
  _ProductsSource = new BehaviorSubject<Product[]>([]);
  counterChanged = new BehaviorSubject<any>(0);

  // Exposed observable (read-only).

  constructor(private http: HttpClient) {}
  userID = 1;
  addedProducts: Product[] = [];
  cartCounter: number = 0;
  // Get last value without subscribing to the Products$ observable (synchronously).
  getProducts() {
    // return this._ProductsSource.getValue();
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append('user_id', this.userID);
    // return this.getCart(queryParams).subscribe({
    //   next: (res: any) => {
    //     this.addedProducts = res.Cart;
    //     this._ProductsSource.next(this.addedProducts);
    //     console.log(this.addedProducts);
    //     this._ProductsSource.next(this.addedProducts);
    //     if (this.addedProducts.length) {
    //       this.addedProducts.forEach((item: any) => {
    //         this.cartCounter += item.count;
    //         console.log(this.cartCounter);
    //       });
    //     }
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   },
    //   complete: () => {},
    // });
  }
  getProductArrey() {
    return this.addedProducts;
  }

  private _setProducts(products: Product[]): void {
    this._ProductsSource.next(products);
  }

  addProduct(product: Product): void {
    // const products = [...this.getProducts(), product];
    // if (this.getProducts().includes(product)) {
    //   product.status = product.status + 1;
    // } else {
    //   // this.cartHasBeenChanged.next(this.cartDetalis);
    //   this._setProducts(products);
    // }
  }
  onStaitusChang(product: any) {
    // const arr = this.getProducts();
    // if (arr.includes(product)) {
    //   const index = arr.findIndex((i) => i.id == product.id);
    //   arr[index] = product;
    //   this._ProductsSource.next(arr);
    // }
  }

  removeProduct(product: Product): void {
    // const Products = this.getProducts().filter((p) => p.id !== product.id);
  }

  adoptProduct(product: Product): void {
    // const newProducts = this.getProducts().map((p) =>
    //   p.id === product.id ? ({} as Product) : p
    // );
    // this._setProducts(newProducts);
  }
  getTotalAmount() {
    //   return this.getProducts().length;
  }
  totalPrice() {
    let totalPrice = 0;
    // let productList = this.getProducts();
    // console.log(this.getProducts());
    // productList.forEach((element: Product) => {
    //   totalPrice += element.status * element.selling_price;
    // });
    return totalPrice;
  }
}
