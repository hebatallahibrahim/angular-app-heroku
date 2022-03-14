import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  productArray = [
    {
      id: 1,
      name: 'bed',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
      Count: 1,
    },
    {
      id: 2,
      name: 'chair',
      price: 1500,
      imageUrl: 'https://picsum.photos/200',
      Count: 1,
    },
    {
      id: 3,
      name: 'table',
      price: 1800,
      imageUrl: 'https://picsum.photos/200',
      Count: 1,
    },
    {
      id: 4,
      name: 'productname',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
      Count: 1,
    },
    {
      id: 5,
      name: 'productname',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
      Count: 1,
    },
    {
      id: 6,
      name: 'productname',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
      Count: 1,
    },
  ];
  private cartArray: Product[] = [];
  //
  cartHasBeenChanged: EventEmitter<Product[]> = new EventEmitter<Product[]>();
  //
  constructor(public http: HttpClient) {}
  //
  addToCart(product: Product) {
    console.log(product);
    if (this.cartArray.includes(product)) {
      // product!.Count++;
    } else {
      this.cartArray.push(product);
      console.log(this.cartArray);
      this.cartHasBeenChanged.emit(this.cartArray);
    }
  }
  getAllProduct() {
    this.http
      .get<any>('http://127.0.0.1:8000/api/product/view')
      .subscribe((res) => {
        console.log(res.products[0]);
      });
  }

  getProductByID() {
    this.http
      .get<any>('http://127.0.0.1:8000/api/show/{id}')
      .subscribe((res) => {
        console.log(res.products[0]);
      });
  }

  addProduct(logData: any) {
    this.http
      .post(
        'https://nth-observer-335811-default-rtdb.firebaseio.com/posts.json',
        logData
      )
      .subscribe((respons) => {
        console.log(respons);
      });
  }
  updateProduct() {}
  deleteProduct() {}
}
