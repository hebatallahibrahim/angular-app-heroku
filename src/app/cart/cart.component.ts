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

  totalAmount: any = 0;
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
  }

  removeCartItem() {
    this.totalAmount = this.productCartService.totalPrice();
  }
}
