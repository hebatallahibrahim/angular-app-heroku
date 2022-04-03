import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from './../../Service/cart.service';
import { Product } from './../../Model/product.model';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  cartList: any[] = [];
  addedProducts: any = [];
  cartCounter: any = 0;
  totalAmount: any = 0;
  userID: any;
  value20: number = 1;
  cartitem!: Product;
  counterValue: number = 0;
  imagUrlProduct: string = 'http://127.0.0.1:8000/uploads/product/';
  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    // this.cartList = this.productCartService.getProducts();
    this.cartService.getApiCart();
    this.cartService.cartHasBeenChanged.subscribe({
      next: (res) => {
        this.addedProducts = res;
        let counter = 0,
          amount = 0,
          lastprice = 0,
          total = 0;

        this.addedProducts.forEach((element: any) => {
          counter += element.count;
          if (element.discount || element.count++) {
            lastprice = element.price - element.discount;
            amount = lastprice * element.count;
            total += amount;
          } else {
            amount = element.price * element.count;
            total += amount;
          }
        });
        this.cartCounter = counter;
        this.totalAmount = total;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
  removeCartItem(item: any) {
    const user: any = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userID = userObj.user.id;
      console.log(this.userID);
      this.cartService.deleteCartItem(item, {
        user_id: this.userID,
      });
    } else {
      console.log('user not logged in yet');
    }
  }
  changeItemSitus(product: any, count: any) {
    // debugger;
    // this.router.events
    //   .pipe(
    //     filter((evt: any) => evt instanceof RoutesRecognized),
    //     pairwise()
    //   )
    //   .subscribe((events: RoutesRecognized[]) => {
    //     console.log('previous', events[0].urlAfterRedirects); //previous url
    //     console.log('current url', events[1].urlAfterRedirects); //current url
    //   });
    this.cartService.onStaitusChang(product, count);
  }
  increment() {
    this.counterValue++;
  }
  decrement() {
    this.counterValue--;
  }
}
