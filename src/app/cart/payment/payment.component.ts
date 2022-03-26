import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  selectedValue!: string;
  constructor(private _Router:Router) { }

  ngOnInit(): void {
  }

  checkMethod(){
    if(this.selectedValue=="cod"){
      this._Router.navigate(['/check-out']);
    }
  }

}
