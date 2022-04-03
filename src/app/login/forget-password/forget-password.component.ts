import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Service/login.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  isLoading=false;
  failedAlert=false;
  successAlert=false;
  formRegistration: FormGroup = new FormGroup({
    Email: new FormControl(null,[Validators.required,Validators.email])  
  });
  constructor(private loginService:LoginService) {}

  ngOnInit(): void {}
  getFormData(data: any) {
    this.isLoading=true;
    var formData: any = new FormData();
    formData.append('email', data.get('Email').value);

    this.loginService.forgetPassword(formData).subscribe(
      (data)=>{
        console.log(data);
        this.isLoading=false;
        if(data.status==200){
          this.failedAlert=false;
          this.successAlert=true;
        }else{
          this.successAlert=false;
          this.failedAlert=true;
        }
      },
      (err)=>{
        console.log(err);
        this.isLoading=false;
        this.failedAlert=true;
      }
    )
  }
}
