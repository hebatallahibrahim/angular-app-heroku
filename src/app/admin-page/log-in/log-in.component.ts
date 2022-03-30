import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  dangerAlertShow=false;
  SuccessAlertShow=false;

  formRegistration: FormGroup = new FormGroup({

    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z][a-z0-9]{3,8}$'),
    ])
  
  });
  constructor(public _auth: AuthService, public _Router: Router) { }

  ngOnInit(): void {
  }
  getFormData(data: any) {
    
    var formData: any = new FormData();
    formData.append('password', data.get('Password').value);
    formData.append('email', data.get('Email').value);
    this._auth.adminLogIn(formData).subscribe(
      (data) => {
        if (data.message == 'Admin log in succesfully') 
        {
          // console.log(data);
          this._auth.saveAdminObjectData(data.user,data.access_token);
          this.SuccessAlertShow=true;
          this.dangerAlertShow=false;
          this.formRegistration.reset();
          this._Router.navigate(['/admin']);
        } 
      },
      
      (err) => {
        this.SuccessAlertShow=false;
        this.dangerAlertShow=true;
        console.log(err);
      }
     
    );
    }
  }


