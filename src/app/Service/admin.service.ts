import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAllCategory(): any {
    return this.http.get<any>('http://127.0.0.1:8000/api/category/view');
  }

  getAllProduct(): any {
    return this.http.get<any>('http://127.0.0.1:8000/api/product/view');
  }
  addProduct(addProduct: any) {
    this.http
      .post('http://127.0.0.1:8000/api/product/store', addProduct)
      .subscribe((respons) => {
        console.log(respons);
      });
  }

  updateProduct(update: any, postProduct: any) {
    this.http
      .post(`http://127.0.0.1:8000/api/product/update/${update}`, postProduct)
      .subscribe((respons) => {
        console.log(respons);
      });
  }
  editProduct(edit: any) {
    this.http
      .get(`http://127.0.0.1:8000/api/product/update/{${edit}}`)
      .subscribe((respons) => {
        console.log(respons);
      });
  }

  deleteProduct(deleteProduct: any) {
    this.http
      .delete(`http://127.0.0.1:8000/api/product/update/{${deleteProduct}}`)
      .subscribe((respons) => {
        console.log(respons);
      });
  }
}
