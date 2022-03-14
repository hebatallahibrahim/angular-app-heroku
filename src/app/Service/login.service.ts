import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './../Model/login.model';

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
}
