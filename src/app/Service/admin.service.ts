import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAllCategory(): any {
    return this.http.get<any>('http://127.0.0.1:8000/api/category/view');
  }

  getAllProduct(): any {
    return this.http.get<any>('http://127.0.0.1:8000/api/product/view');
  }

  getAllSubCat(): any {
    return this.http.get<any>('http://127.0.0.1:8000/api/category/sub/view');
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/category/delete/${id}`)
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/product/delete/${id}`)
  }

  deleteSubCat(id: any): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/category/sub/delete/${id}`)
  }

  addProduct(addProduct: any) {
    this.http.post('http://127.0.0.1:8000/api/product/store', addProduct)
  }

  updateProduct(id: any, postProduct: any) {
    this.http
      .post(`http://127.0.0.1:8000/api/product/update/${id}`, postProduct)
      .subscribe((respons) => {
        console.log(respons);
      });
  }
  editProduct(edit: any) {
    this.http
      .get(`http://127.0.0.1:8000/api/product/update/{${edit}}`)
      .subscribe((respons) => {
        console.log(respons);
      });
  }

  



}
