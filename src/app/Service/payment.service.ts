import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient: HttpClient) { }

  payByOtherMethods(data: any): Observable<any> {
    return this._HttpClient.post(
      `http://127.0.0.1:8000/api/pay`,
      data
    );
  }
}
