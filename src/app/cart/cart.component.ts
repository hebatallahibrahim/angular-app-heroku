import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Product } from '../Model/product.model';
import { CartService } from '../Service/cart.service';
import { ProductCartService } from '../Service/productCart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  arr = [1, 2, 3, 4];
  cartList: any[] = [];
  addedProducts: any = [];
  cartCounter: any = 0;
  totalAmount: any = 0;
  AlltotalAmount: any = 0;
  totalDiscount: any = 0;

  // auth login
  islogin: boolean = false;
  constructor(
    public _AuthService: AuthService,
    private cartService: CartService,
    private productCartService: ProductCartService
  ) {
    _AuthService.UserData.subscribe((data) => {
      if (data) {
        this.islogin = true;
      }
      {
        this.islogin = false;
      }
    });

    // _AuthService.UserData.subscribe({

    // })
  }

  ngOnInit(): void {
    // this.cartService.getProductData().subscribe((res) => {
    // });
    this.totalAmount = this.productCartService.totalPrice();
    this.cartService.getApiCart();
    this.cartService.cartHasBeenChanged.subscribe({
      next: (res) => {
        this.addedProducts = res;
        let counter = 0,
          total = 0,
          totalDiscount = 0,
          priceWithoutDiscount = 0;
        this.addedProducts.forEach((element: any) => {
          counter += element.count;

          if (element.discount || element.count++) {
            totalDiscount += +element.discount * +element.count;
            priceWithoutDiscount += +element.price * +element.count;
          } else {
          }
        });
        this.cartCounter = counter;
        this.totalAmount = total;
        this.totalDiscount = totalDiscount;
        this.AlltotalAmount = priceWithoutDiscount;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  removeCartItem() {
    this.totalAmount = this.productCartService.totalPrice();
  }
}
