import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './../Model/login.model';
import { LoginService } from './../Service/login.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Service/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private auth: AuthenticationService) {}
  dangerAlertShow = false;
  SuccessAlertShow = false;
  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.auth.loginUser(email, password).subscribe(
      (res: any) => {
        console.log(res);
        if (res.message == 'users log in succesfully') {
          localStorage.setItem('user', JSON.stringify(res));
          this.SuccessAlertShow = true;
          this.dangerAlertShow = false;
          // redirect to dashboard
          this.router.navigate(['/product-list']);
        }
      },
      (err) => {
        this.SuccessAlertShow = false;
        this.dangerAlertShow = true;
        console.log(err);
      }
    );
  }
}
// var obj = { first: 'someVal' };
// obj[Object.keys(obj)[0]];
