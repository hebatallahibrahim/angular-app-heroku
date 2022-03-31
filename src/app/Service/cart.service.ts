import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Product } from '../Model/product.model';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  productcount: any = 1;
  addedProducts: any = [];
  cartCounter: any = 0;
  userID = 1;

  public cartHasBeenChanged = new BehaviorSubject<any>([]);

  //

  getApiCart() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('user_id', this.userID);
    return this.http
      .get(`http://127.0.0.1:8000/api/user/cart`, {
        params: queryParams,
      })
      .subscribe({
        next: (res: any) => {
          this.addedProducts = res.Cart;
          this.cartHasBeenChanged.next(this.addedProducts);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
  onStaitusChang(product: any) {
    console.log(this.addedProducts);
    const arr = this.addedProducts;
    if (arr.includes(product)) {
      const index = arr.findIndex((i: any) => {
        console.log(i);
        i.product_id == product.product_id;
      });
      console.log(this.addedProducts);

      arr[index] = product;
      this.cartHasBeenChanged.next(arr);
    }
  }

  postCart(postData: any, product: any) {
    this.http
      .post<{ status: number; message: string }>(
        `http://127.0.0.1:8000/api/cart`,
        postData
      )
      .subscribe({
        next: (res) => {
          this.getApiCart();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
    this.cartHasBeenChanged.next(this.addedProducts);
  }

  deleteCartItem(product: any, queryParams: any) {
    let product_id = product.product_id;

    this.http
      .delete(`http://127.0.0.1:8000/api/cart/${product_id}`, {
        params: queryParams,
      })
      .subscribe({
        next: (res) => {
          this.addedProducts.map((d: any, index: any) => {
            if (product.product_id == d.product_id) {
              this.addedProducts.splice(index, 1);
              console.log(d);
              console.log(index);
            }
          });
          this.cartHasBeenChanged.next(this.addedProducts);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
}
