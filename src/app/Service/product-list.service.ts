import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


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
  
  constructor(private http: HttpClient) {}
  //
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

  
}
