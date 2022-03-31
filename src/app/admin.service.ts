import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AdminData } from './adminData';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _HttpClient: HttpClient) { }
  AdminData = new BehaviorSubject(null);
  addUser(data: any): Observable<any> {
    console.log(data);
    return this._HttpClient.post(
      'http://127.0.0.1:8000/api/adminuser/store',
      data
    ); //wating api
  }

  addCategory(data: any): Observable<any> {
    return this._HttpClient.post(
      'http://127.0.0.1:8000/api/category/store',
      data
    ); //wating api
  }

  addSubCategory(data: any): Observable<any> {
    return this._HttpClient.post(
      'http://127.0.0.1:8000/api/category/sub/store',
      data
    ); //wating api
  }

  addProduct(data: any): Observable<any> {
    return this._HttpClient.post(
      'http://127.0.0.1:8000/api/product/store',
      data
    ); //wating api
  }

  addSlider(data: any): Observable<any> {
    return this._HttpClient.post(
      'http://127.0.0.1:8000/api/slider/store',
      data
    ); //wating api
  }

  getAllUsers(): Observable<any> {
    return this._HttpClient
      .get<any>('http://127.0.0.1:8000/api/adminuser/all');
  }

  getAllCategories(): Observable<any> {
    return this._HttpClient
      .get<any>('http://127.0.0.1:8000/api/category/view');
  }

  getAllSubCategories(): Observable<any> {
    return this._HttpClient
      .get<any>('http://127.0.0.1:8000/api/category/sub/view');
  }

  getAllSubCategoriesbyCat(category_id:any): Observable<any> {
    return this._HttpClient
      .get<any>(`http://127.0.0.1:8000/api/category/catsub/view/${category_id}`);
  }

  getSlider(): Observable<any> {
    return this._HttpClient
      .get<any>('http://127.0.0.1:8000/api/slider/view');
  }
}
