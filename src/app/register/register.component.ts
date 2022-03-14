import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import{ Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formRegistration: FormGroup = new FormGroup({
    Name: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
    ]),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z][a-z0-9]{3,8}$'),
    ]),
    Phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^01[0125][0-9]{8}$'),
    ]),
    Address: new FormControl(null, Validators.required),
    City: new FormControl(null, Validators.required),
    Region: new FormControl(null, Validators.required),
  });
   err:string | undefined;
  constructor(public _AuthService:AuthService , public  _Router:Router ) {}

  ngOnInit(): void {}
  getFormData(FormData: any) {
    // console.log(FormData.value);
    
    if(FormData.valid=='success' ) {
      
      this._AuthService.signup(FormData.value).subscribe(data=> {
        // console.log(data);
        if(data.message=='success')
        {
         this._Router.navigate(['/login']);      
        }
        else 
        {
          this.err='not valid data';
        }
      });
    }
  }
}
