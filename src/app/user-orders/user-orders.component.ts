import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../Service/payment.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  orderArray:any[]=[];
  selectedOrders:any[]=[];
  userObj:any={};
  isLoading=true;
  constructor(private paymentService:PaymentService) { }

  ngOnInit(): void {
    const user: any = localStorage.getItem('user');
    this.userObj = JSON.parse(user);
    this.getOrders();
  }


  getOrders(){
    this.paymentService.getAllUserOrders(this.userObj.user.email).subscribe(
      (data)=>{
        console.log(data);
        this.isLoading=false;
        this.orderArray=data.orders;
      },
      (err)=>{
        console.log(err);
        this.isLoading=false;
      }
    );
  }
}
