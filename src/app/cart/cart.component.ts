import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  arr = [1, 2, 3, 4];

  // auth login 
   islogin:boolean=false;
  constructor(public _AuthService:AuthService ) {
   _AuthService.UserData.subscribe(data =>
    {
     if(data)
     { 
      this.islogin=true;
     }
     { 
      this.islogin=false;
     }

   })
   
    // _AuthService.UserData.subscribe({

    // })
  }

  ngOnInit(): void {}
}
