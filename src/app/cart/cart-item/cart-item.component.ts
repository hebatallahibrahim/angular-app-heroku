import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductCartService } from 'src/app/Service/productCart.service';
import { CartService } from './../../Service/cart.service';
import { Product } from './../../Model/product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  cartList: any[] = [];
  @Output() updateItems = new EventEmitter<any>();
  value20: number = 1;
  cartitem!: Product;
  counterValue: number = 0;
  imagUrlProduct: string = 'http://127.0.0.1:8000/uploads/product/';
  constructor(
    private productCartService: ProductCartService
  ) {}
  ngOnInit(): void {
   
    this.cartList = this.productCartService.getProducts();
  }
  removeCartItem(item: any) {
    this.productCartService.removeProduct(item);
    this.cartList = this.productCartService.getProducts();
    this.updateItems.emit();
  }
  changeItemSitus(product: Product, count: any) {
    product.status = count;
    this.productCartService.onStaitusChang(product);
    this.updateItems.emit();
  }
  increment() {
    this.counterValue++;
  }
  decrement() {
    this.counterValue--;
  }
}
