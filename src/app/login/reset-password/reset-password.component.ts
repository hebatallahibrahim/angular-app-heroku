import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token!:any;
  email!:any;
  isLoading=false;
  failedAlert=false;
  matchAlert=false;

  formRegistration: FormGroup = new FormGroup({
    Password: new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]),
    confirmPassword: new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z0-9]{3,8}$')])  
  });
  constructor(private activetedRoute: ActivatedRoute,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  getFormData(data: any) {
    this.isLoading=true;
    if(data.get('Password').value==data.get('confirmPassword').value){
      this.matchAlert=false;
      this.token = this.activetedRoute.snapshot.paramMap.get('token');
      this.email = this.activetedRoute.snapshot.paramMap.get('email');
      var formData: any = new FormData();
      formData.append('email', this.email);
      formData.append('password', data.get('Password').value);
      formData.append('token', this.token);
      this.loginService.resetPassword(formData).subscribe(
        (data)=>{
          console.log(data);
          this.isLoading=false;
          this.failedAlert=false;
          this.router.navigate(['login']);
        },
        (err)=>{
          console.log(err);
          this.isLoading=false;
          this.failedAlert=true;
        }
      );
    }else{
      this.matchAlert=true;
      this.isLoading=false;
      this.failedAlert=false;
    }
  }
}
