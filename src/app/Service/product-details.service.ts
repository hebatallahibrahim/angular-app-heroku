import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private http: HttpClient) {}
  getProductByID(id: any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/product/show/${id}`);
  }
}
