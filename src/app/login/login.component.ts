import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './../Model/login.model';
import { LoginService } from './../Service/login.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Service/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor( private router:Router, private auth:AuthenticationService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;

    console.log(email, password);
    this.auth.loginUser(email, password).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res))

      // redirect to dashboard
      this.router.navigate(['/cart']);
    },
    err=>{
      console.log(err);
    })

  }
  
}
// var obj = { first: 'someVal' };
// obj[Object.keys(obj)[0]];
