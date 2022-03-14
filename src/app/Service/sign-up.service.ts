import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signUp } from '../Model/signUp.model';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  sendRquestLogin(
    name: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    city: string,
    region: string
  ) {
    const signData: signUp = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address,
      city: city,
      region: region,
    };
    this.http
      .post(
        'https://nth-observer-335811-default-rtdb.firebaseio.com/signUp.json',
        signData
      )
      .subscribe((respons) => {
        console.log(respons);
      });
  }
}
