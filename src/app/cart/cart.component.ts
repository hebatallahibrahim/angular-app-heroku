import { Component, OnInit } from '@angular/core';
import { CartService } from '../Service/cart.service';

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
  constructor(private cartService: CartService) {
    // _AuthService.UserData.subscribe({
    // })
  }

  ngOnInit(): void {
    // this.cartService.getProductData().subscribe((res) => {
    // });

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
}
