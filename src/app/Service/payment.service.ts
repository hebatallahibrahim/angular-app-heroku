import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient: HttpClient) { }

  cashOnDelivery(data:any):Observable<any>{
    return this._HttpClient.post(
      `http://127.0.0.1:8000/api/cash/order`,
      data
    );
  }
  payByOtherMethods(data: any): Observable<any> {
    return this._HttpClient.post(
      `http://127.0.0.1:8000/api/pay`,
      data
    );
  }
  getAllUserOrders(email:any):Observable<any> {
    return this._HttpClient.get<any>(`http://127.0.0.1:8000/api/user/orders/${email}`);
  }
  deleteUserOrder(id:any):Observable<any>{
    return this._HttpClient.delete<any>(`http://127.0.0.1:8000/api/user/order/${id}`);
  }
}
