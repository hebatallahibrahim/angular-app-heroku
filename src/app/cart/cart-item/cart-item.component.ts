import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/Model/product.model';

import { CartService } from './../../Service/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input()
  cartList: any[] = [];
  totalAmount: any = 0;
  cartitem!: Product;
  countries = COUNTRIES;
  counterValue: number = 0;
  imagUrlProduct: string = 'http://127.0.0.1:8000/uploads/product/';
  ngOnInit(): void {
    this.cartService.getProductData().subscribe((res) => {
      this.cartList = res;
      this.totalAmount = this.cartService.getTotalAmount();
    });
  }
  removeCartItem(item: any) {
    this.cartService.removeCatItem(item);
  }
  increment() {
    this.counterValue++;
  }
  decrement() {
    this.counterValue--;
  }
  constructor(private cartService: CartService) {}
}
interface Country {
  name: string;
  img: string;
  count: number;
  total: number;
}
const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    img: 'https://picsum.photos/100',
    count: 17075200,
    total: 150,
  },
  {
    name: 'Canada',
    img: 'https://picsum.photos/100',
    count: 9976140,
    total: 200,
  },
  {
    name: 'United States',
    img: 'https://picsum.photos/100',
    count: 9629091,
    total: 155,
  },
  {
    name: 'China',
    img: 'https://picsum.photos/100',
    count: 9596960,
    total: 255,
  },
];
function InPut() {
  throw new Error('Function not implemented.');
}
