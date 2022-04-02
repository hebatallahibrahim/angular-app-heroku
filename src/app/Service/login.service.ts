import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './../Model/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  sendRquestLogin(email: string, password: string) {
    const logData: Login = { email: email, password: password };
    this.http
      .post(
        'https://nth-observer-335811-default-rtdb.firebaseio.com/posts.json',
        logData
      )
      .subscribe((respons) => {
        console.log(respons);
      });
  }
  getRsponse() {
    this.http
      .get('https://nth-observer-335811-default-rtdb.firebaseio.com/posts.json')
      .subscribe((get: any) => {
        console.log(get[Object.keys(get)[1]]);
      });
  }

  forgetPassword(data: any): Observable<any> {
    return this.http.post(
      `http://127.0.0.1:8000/api/forget_password`,
      data
    );
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(
      `http://127.0.0.1:8000/api/reset_password`,
      data
    );
  }
}
