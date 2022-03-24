import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class contactUsService {
  constructor(public _HttpClient: HttpClient) {}

  registData(data: any): Observable<any> {
    return this._HttpClient.post(
      'http://127.0.0.1:8000/api/contactUs/add',
      data
    );
  }

  subscribeToUpdates(data: any): Observable<any> {
    return this._HttpClient.post(
      'http://127.0.0.1:8000/api/subscribe',
      data
    );
  }

  deleteSubscription(email: any): Observable<any> {
    return this._HttpClient.delete(`http://127.0.0.1:8000/api/unsubscribe/${email}`);
  }
}
