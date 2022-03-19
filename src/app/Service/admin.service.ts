import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class adminservice {
  constructor(private http: HttpClient) {}

  getAllCategory(): any {
    return this.http.get<any>('http://127.0.0.1:8000/api/category/view');
  }
  deleteCategory(id: any): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/category/delete/${id}`)
  }

  editCategory(id:any): Observable<any> {
    
    return this.http.get(`http://127.0.0.1:8000/api/category/edit/${id}`)
  }
  updateCategry(id: any, postProduct: any): Observable<any>  {
    return this.http.post(`http://127.0.0.1:8000/api/category/update/${id}`, postProduct);
  }
  
  getAllProduct(): any {
    return this.http.get<any>('http://127.0.0.1:8000/api/product/view');
  }
  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/product/delete/${id}`)
  }
  
  addProduct(addProduct: any) {
    this.http.post('http://127.0.0.1:8000/api/product/store', addProduct)
  }
  find(id:any): Observable<any> {
    
    return this.http.get(`http://127.0.0.1:8000/api/product/edit/${id}`)
  }
  
  updateProduct(id: any, postProduct: any): Observable<any>  {
    return this.http.post(`http://127.0.0.1:8000/api/product/update/${id}`, postProduct);
  }
  
  getAllSubCat(): any {
      return this.http.get<any>('http://127.0.0.1:8000/api/category/sub/view');
    }

  deleteSubCat(id: any): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/category/sub/delete/${id}`)
  }
  editSubCategory(id:any): Observable<any> {
    
    return this.http.get(`http://127.0.0.1:8000/api/category/sub/edit/${id}`)
  }
  updateSubCategry(id: any, postProduct: any): Observable<any>  {

    return this.http.post(`http://127.0.0.1:8000/api/category/sub/update/${id}`, postProduct);
  }
  
  getAllContactUsMessages(): any {
    return this.http.get<any>('http://127.0.0.1:8000/api/contactUs');
  }
  getContactUsMessageByID(id: any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/contactUs/${id}`);
  }
  deleteContactUsMessage(id: any): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/contactUs/delete/${id}`)
  }

}
