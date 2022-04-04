import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  productcount: any = 1;
  addedProducts: any = [];
  cartCounter: any = 0;
  userID: any = 0;

  public cartHasBeenChanged = new BehaviorSubject<any>([]);

  //
  getApiCart() {
    const user: any = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userID = userObj.user.id;

      let queryParams = new HttpParams();
      queryParams = queryParams.append('user_id', this.userID);
      this.http
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
    } else {
      this.addedProducts = [];
      this.cartHasBeenChanged.next(this.addedProducts);
    }
  }
  onStaitusChang(product: any, count: any) {
    const postData = {
      product_id: product.product_id,
      user_id: this.userID,
      count: count,
    };
    this.http
      .post<{ status: number; message: string }>(
        `http://127.0.0.1:8000/api/update/cart`,
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

  removeAllUserCart(user_id: any) {
    return this.http.delete(`http://127.0.0.1:8000/api/all-cart/${user_id}`);
  }
}
