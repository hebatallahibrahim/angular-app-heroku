import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './../Model/login.model';
import { LoginService } from './../Service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _HttpClient: HttpClient,
    private loginService: LoginService
  ) {}
  ngOnInit() {
    this.loginService.getRsponse();
  }
  onLogIn(data: Login) {
    this.loginService.sendRquestLogin(data.email, data.password);
  }
  onFetchLogin() {
    this.loginService.getRsponse();
  }
}
// var obj = { first: 'someVal' };
// obj[Object.keys(obj)[0]];
