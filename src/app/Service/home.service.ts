import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _HttpClient: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this._HttpClient.get<any>('http://127.0.0.1:8000/api/category/view');
  }

  getCategoryProducts(id: any): Observable<any> {
    return this._HttpClient.get<any>(
      `http://127.0.0.1:8000/api/category/${id}`
    );
  }

  getAllProduct(): any {
    return this._HttpClient.get<any>('http://127.0.0.1:8000/api/product/view');
  }

  getSlider(): Observable<any> {
    return this._HttpClient.get<any>('http://127.0.0.1:8000/api/slider/view');
  }
}
