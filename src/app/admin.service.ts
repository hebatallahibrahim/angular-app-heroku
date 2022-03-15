import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AdminData } from './adminData';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public _HttpClient: HttpClient) { }
  AdminData = new BehaviorSubject(null);
  addUser(data: any): Observable<any> {
    return this._HttpClient.post(
      'http://127.0.0.1:8000/api/adminuser/store',
      data
    ); //wating api
  }
}
