import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  addProduct(addProduct: any) {
    this.http
      .post('http://127.0.0.1:8000/api/product/store', addProduct)
      .subscribe((respons) => {
        console.log(respons);
      });
  }
  updateProduct(postProduct: any) {
    this.http
      .post('http://127.0.0.1:8000/api/product/update/{id}', postProduct)
      .subscribe((respons) => {
        console.log(respons);
      });
  }
  editProduct() {
    this.http
      .get('http://127.0.0.1:8000/api/product/update/{id}')
      .subscribe((respons) => {
        console.log(respons);
      });
  }
  deleteProduct() {
    this.http
      .delete('http://127.0.0.1:8000/api/product/update/{id}')
      .subscribe((respons) => {
        console.log(respons);
      });
  }
}
