import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(addProducts: any) {
    this.http
      .post('http://127.0.0.1:8000/api/product/update/{id}', addProducts)
      .subscribe((respons: any) => {
        console.log(respons);
      });
  }
}
