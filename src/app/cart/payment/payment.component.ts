import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';
import { PaymentService } from 'src/app/Service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  selectedValue!: string;
  addedProducts: any = [];
  categoryArray: any[] = [];
  cartCounter: any = 0;
  totalAmount: any = 0;
  userObj:any={};
  constructor(
    private _Router: Router,
    private paymentService: PaymentService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const user: any = localStorage.getItem('user');
    this.userObj = JSON.parse(user);
    // this.userID = userObj.user.id;
    // console.log(this.userID);
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

  checkMethod() {
    if (this.selectedValue == 'cod') {
      var formData: any = new FormData();
      formData.append('email', this.userObj.user.email);
      formData.append('InvoiceValue', this.totalAmount);
      formData.append('products',JSON.stringify(this.addedProducts));
      this.paymentService.cashOnDelivery(formData).subscribe(
        (data) => {
          console.log(data);
          this.cartService.removeAllUserCart(this.userObj.user.id).subscribe();
          this._Router.navigate(['/user-orders']);
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (this.selectedValue == 'other') {
      var formData: any = new FormData();
      formData.append('CustomerName', this.userObj.user.name);
      formData.append('CustomerEmail', this.userObj.user.email);
      formData.append('InvoiceValue', this.totalAmount);
      formData.append('CustomerMobile', this.userObj.user.phone);

      this.paymentService.payByOtherMethods(formData).subscribe(
        (data) => {
          console.log(data);
          window.location.href = data.Data.InvoiceURL;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
