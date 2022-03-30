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
  userEmail="nada@gmail.com";
  constructor(private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  removeProdItem(id: any): void {
    this.paymentService.deleteUserOrder(id).subscribe(
      (res) => {
      console.log(res);
      if(res.status==200){
      this.orderArray = this.orderArray.filter(item => item.id !== id);
      }
      },
      (err)=>{
        console.log(err);
      }
    )
    
  }

  getOrders(){
    this.paymentService.getAllUserOrders(this.userEmail).subscribe(
      (data)=>{
        console.log(data);
        this.orderArray=data.orders;
      },
      (err)=>{
        console.log(err);
      }
    );
  }
}
