import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contactUs } from '../Model/contactUs.model';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(private http: HttpClient) {}

  sendRquestLogin(
    fname: string,
    lname: string,
    email: string,
    message: string,
    id?: string
  ) {
    const logData: contactUs = {
      fname: fname,
      lname: lname,
      email: email,
      message: message,
    };
    this.http
      .post('http://127.0.0.1:8000/api/contactUs/add', logData)
      .subscribe((respons) => {
        console.log(respons);
      });
  }
}
