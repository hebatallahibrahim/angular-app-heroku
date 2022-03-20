import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient: HttpClient) { }

  addToWishlist(data: any,id:any): Observable<any> {
    return this._HttpClient.post(
      `http://127.0.0.1:8000/api/user/wishlist/add/${id}`,
      data
    ); //wating api
  }

  deleteFromWishlist(queryParams:any,id: any): Observable<any> {
    return this._HttpClient.delete(`http://127.0.0.1:8000/api/user/wishlist-remove/${id}`,{params:queryParams});
  }

  getWishlistProducts(queryParams:any): Observable<any> {
    return this._HttpClient.get(`http://127.0.0.1:8000/api/user/get-wishlist-product`,{params:queryParams});
  }
}
