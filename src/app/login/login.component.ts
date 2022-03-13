import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { AuthService } from '../auth.service';
import{ Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  err:string | undefined;
  constructor(public _AuthService:AuthService , public  _Router:Router ) {}

  formLogin: FormGroup = new FormGroup({
     Email: new FormControl(null, [Validators.required, Validators.email]),
     Password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z][a-z0-9]{3,8}$'),
    ])  
  });
 

  ngOnInit(): void {}
  getFormData(FormData: any) {
    // console.log(FormData.value);
    if(FormData.valid=='success' ) {
      
      this._AuthService.signin(FormData.value).subscribe(data=> {
        // console.log(data);
        if(data.message =='success')
        {
          this._AuthService.saveUserData(data.citizen,data.token);
         this._Router.navigate(['/home']);      
        }
        else 
        {
          this.err='not valid data';
        }
      });
    }
  }
}
