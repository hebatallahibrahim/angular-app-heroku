import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './../Model/login.model';
import { LoginService } from './../Service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _HttpClient: HttpClient,
    private loginService: LoginService,
    private _AuthService: AuthService,
    private _Router: Router
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
  err: string | undefined;

  formLogin: FormGroup = new FormGroup({
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z][a-z0-9]{3,8}$'),
    ]),
  });

  getFormData(FormData: any) {
    // console.log(FormData.value);
    if (FormData.valid == 'success') {
      this._AuthService.signin(FormData.value).subscribe((data) => {
        // console.log(data);
        if (data.message == 'success') {
          this._AuthService.saveUserData(data.citizen, data.token);
          this._Router.navigate(['/home']);
        } else {
          this.err = 'not valid data';
        }
      });
    }
  }
}
// var obj = { first: 'someVal' };
// obj[Object.keys(obj)[0]];
