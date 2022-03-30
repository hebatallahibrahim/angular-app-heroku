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
  //
  // cartHasBeenChanged = new BehaviorSubject<any>([]);

  // //
  // getCartDetails() {
  //   // return this.cartHasBeenChanged.asObservable();
  //   return this.cartDetalis;
  // }
  // setProduct(product: any) {
  //   this.cartDetalis.push(...product);
  //   // this.cartHasBeenChanged.next(product);
  // }
  // addToCart(product: Product) {
  //   if (this.cartDetalis.includes(product)) {
  //     this.productcount = product.status;
  //     product.status = product.status + 1;
  //   } else {
  //     this.cartDetalis.push(product);
  //     // this.cartHasBeenChanged.next(this.cartDetalis);
  //   }
  // }
  // getTotalAmount() {
  //   return this.cartDetalis.length;
  // }
  // totalPrice() {
  //   let totalPrice = 0;
  //   this.cartDetalis.forEach((element: Product) => {
  //     totalPrice += element.status * element.selling_price;
  //   });
  //   // this.cartHasBeenChanged.next(this.cartDetalis);
  //   return totalPrice;
  // }
  // removeCatItem(product: any) {
  //   this.cartDetalis.map((d: any, index: any) => {
  //     if (product.id == d.id) {
  //       this.cartDetalis.splice(index, 1);
  //     }
  //   });
  //   // this.cartHasBeenChanged.next(this.cartDetalis);
  // }
  public cartHasBeenChanged = new BehaviorSubject<any>([]);
  public counterChanged = new BehaviorSubject<number>(0);

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
          console.log(res);
          this.addedProducts = res.Cart;
          this.cartHasBeenChanged.next(this.addedProducts);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }

  postCart(postData: any, product: any) {
    this.http
      .post<{ status: number; message: string }>(
        `http://127.0.0.1:8000/api/cart`,
        postData
      )
      .subscribe({
        next: (res) => {
          console.log(this.addedProducts);
          if (res.message == 'Item increament  to CART') {
            this.addedProducts.forEach((element: any) => {
              console.log(element);
              if (element.product_id == product.id) {
                console.log('incremt');
                // element.count++;
                // console.log(element.count);
                this.cartHasBeenChanged.next(this.addedProducts);
              }
            });
            console.log('increament');
          } else if ((res.message = 'Product added succesfully')) {
            this.getApiCart();
            this.cartHasBeenChanged.next(this.addedProducts);
            console.log(this.addedProducts);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
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
