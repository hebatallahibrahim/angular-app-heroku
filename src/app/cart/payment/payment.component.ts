import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/Service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  selectedValue!: string;
  constructor(private _Router:Router,private paymentService:PaymentService) { }

  ngOnInit(): void {
  }

  checkMethod(){
    if(this.selectedValue=="cod"){
      var formData: any = new FormData();
      formData.append('email', "nada@gmail.com");
      formData.append('InvoiceValue',5);
      this.paymentService.cashOnDelivery(formData).subscribe(
        (data)=>{
          this._Router.navigate(['/user-orders']);
        },
        (err)=>{
          console.log(err);
        }
      );
      
    }else if(this.selectedValue=="other"){
      var formData: any = new FormData();
      formData.append('CustomerName', "nada");
      formData.append('CustomerEmail', "nada@gmail.com");
      formData.append('InvoiceValue',5);
      formData.append('CustomerMobile',"01150627811");

      this.paymentService.payByOtherMethods(formData).subscribe(
          (data) => {
            console.log(data);
            window.location.href=data.Data.InvoiceURL;
          },
          (err) => {
            console.log(err);
          }
      );
    }
  }

}
