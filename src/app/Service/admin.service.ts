import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class adminservice {
  constructor(private http: HttpClient) {}

  MessagesArray: any[] = [];
  getAllCategory(): any {
    return this.http.get<any>('http://127.0.0.1:8000/api/category/view');
  }
  deleteCategory(id: any): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/category/delete/${id}`);
  }

  editCategory(id: any): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/category/edit/${id}`);
  }
  updateCategry(id: any, postProduct: any): Observable<any> {
    return this.http.post(
      `http://127.0.0.1:8000/api/category/update/${id}`,
      postProduct
    );
  }

  getAllProduct(): any {
    return this.http.get<any>('http://127.0.0.1:8000/api/product/view');
  }
  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/product/delete/${id}`);
  }

  addProduct(addProduct: any) {
    this.http.post('http://127.0.0.1:8000/api/product/store', addProduct);
  }
  find(id: any): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/product/edit/${id}`);
  }

  updateProduct(id: any, postProduct: any): Observable<any> {
    return this.http.post(
      `http://127.0.0.1:8000/api/product/update/${id}`,
      postProduct
    );
  }

  getAllSubCat(): any {
    return this.http
      .get<any>('http://127.0.0.1:8000/api/category/sub/view')
      .subscribe(
        (data: any) => {
          console.log(data);
          this.MessagesArray = data.ALLContactUs;
          console.log(this.MessagesArray);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  deleteSubCat(id: any): Observable<any> {
    return this.http.delete(
      `http://127.0.0.1:8000/api/category/sub/delete/${id}`
    );
  }
  editSubCategory(id: any): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/category/sub/edit/${id}`);
  }
  updateSubCategry(id: any, postProduct: any): Observable<any> {
    return this.http.post(
      `http://127.0.0.1:8000/api/category/sub/update/${id}`,
      postProduct
    );
  }
  messagesHasBeenChanged = new BehaviorSubject<any>([]);
  getAllContactUsMessages(): any {
    return this.http.get<any>('http://127.0.0.1:8000/api/contactUs').subscribe({
      next: (res) => {
        console.log(res);
        this.MessagesArray = res.ALLContactUs;
        this.messagesHasBeenChanged.next(this.MessagesArray);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
  setMessage(arr: any) {
    this.MessagesArray = arr;
    this.messagesHasBeenChanged.next(this.MessagesArray);
  }

  getContactUsMessageByID(id: any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/contactUs/${id}`);
  }
  deleteContactUsMessage(id: any) {
    this.http
      .delete(`http://127.0.0.1:8000/api/contactUs/delete/${id}`)
      .subscribe((res: any) => {
        this.MessagesArray = this.MessagesArray.filter(
          (item) => item.id !== id
        );
        this.messagesHasBeenChanged.next(this.MessagesArray);
      });
    console.log(this.MessagesArray);
  }
  sendMasseage() {
    this.messagesHasBeenChanged.next(this.MessagesArray);
    return this.MessagesArray;
  }
  deleteUserAcount(id: any): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/adminuser/delete/${id}`);
  }
  deleteSlider(id: any): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/slider/delete/${id}`);
  }
}
