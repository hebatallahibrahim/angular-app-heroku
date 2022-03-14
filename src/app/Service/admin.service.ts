import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
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
  updateProduct() {
    this.http
      .get('http://127.0.0.1:8000/api/update/{id}')
      .subscribe((respons) => {
        console.log(respons);
      });
  }
  editProduct() {
    this.http
      .get('http://127.0.0.1:8000/api/update/{id}')
      .subscribe((respons) => {
        console.log(respons);
      });
  }
  deleteProduct() {}
}
