import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../Model/product.model';

@Injectable({ providedIn: 'root' })
export class ProductCartService {
  // Make _ProductsSource private so it's not accessible from the outside,
  // expose it as Products$ observable (read-only) instead.
  // Write to _ProductsSource only through specified store methods below.
  private readonly _ProductsSource = new BehaviorSubject<Product[]>([]);

  // Exposed observable (read-only).
  readonly Products$ = this._ProductsSource.asObservable();

  constructor(private http: HttpClient) {}
  userID = 1;
  // Get last value without subscribing to the Products$ observable (synchronously).
  getProducts(): Product[] {
    return this._ProductsSource.getValue();
  }

  private _setProducts(products: Product[]): void {
    this._ProductsSource.next(products);
  }

  addProduct(product: Product): void {
    const products = [...this.getProducts(), product];
    if (this.getProducts().includes(product)) {
      product.status = product.status + 1;
    } else {
      // this.cartHasBeenChanged.next(this.cartDetalis);
      this._setProducts(products);
    }
  }
  onStaitusChang(product: any) {
    const arr = this.getProducts();
    if (arr.includes(product)) {
      const index = arr.findIndex((i) => i.id == product.id);
      arr[index] = product;
      this._ProductsSource.next(arr);
    }
  }

  removeProduct(product: Product): void {
    const Products = this.getProducts().filter((p) => p.id !== product.id);
  }

  adoptProduct(product: Product): void {
    const newProducts = this.getProducts().map((p) =>
      p.id === product.id ? ({} as Product) : p
    );
    this._setProducts(newProducts);
  }
  getTotalAmount() {
    return this.getProducts().length;
  }
  totalPrice() {
    let totalPrice = 0;
    let productList = this.getProducts();
    console.log(this.getProducts());
    productList.forEach((element: Product) => {
      totalPrice += element.status * element.selling_price;
    });
    return totalPrice;
  }
  postCart(postData: any) {
    this.http.post(`http://127.0.0.1:8000/api/cart`, postData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
  getCart(queryParams: any): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/user/cart`, {
      params: queryParams,
    });
  }
  deleteCartItem(product_id: any, queryParams: any) {
    this.http
      .delete(`http://127.0.0.1:8000/api/cart/${product_id}`, {
        params: queryParams,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
}
function params(arg0: string, params: any, queryParams: any) {
  throw new Error('Function not implemented.');
}
