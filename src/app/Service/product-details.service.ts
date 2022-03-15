import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private http: HttpClient) {}
  getProductByID(id: any) {
    this.http.get<any>(`http://127.0.0.1:8000/api/show/${id}`);
  }
}
