import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/Service/product-list.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  listof = [];
  constructor(productListService: ProductListService, http: HttpClient) {
   
  }
  ngOnInit(): void{
  }
  testNow() {
   
  }
}
