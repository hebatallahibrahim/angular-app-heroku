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

  addProductRating(data: any,id:any): Observable<any> {
    return this.http.post(
      `http://127.0.0.1:8000/api/rate/product/${id}`,
      data
    ); //wating api
  }
  
  deleteRating(queryParams:any,id: any): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/rate/delete/${id}`,{params:queryParams});
  }

  getUserRating(queryParams:any,id: any): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/user/rate/${id}`,{params:queryParams});
  }
}
