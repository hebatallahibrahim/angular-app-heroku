import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
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
  usersArray:any[]=[];
  err: string | undefined;
  dangerAlertShow=false;
  SuccessAlertShow=false;
  isLoading=false;
  constructor(public _AdminService: AdminService, public _Router: Router) { }

  ngOnInit(): void {
  }
  getFormData(data: any) {
    this.isLoading=true;
    var formData: any = new FormData();
    formData.append('name', data.get('Name').value);
    formData.append('email', data.get('Email').value);
    formData.append('phone', data.get('Phone').value);
    formData.append('address', data.get('Address').value);
    formData.append('city', data.get('City').value);
    formData.append('region', data.get('Region').value);
    formData.append('password', data.get('Password').value);

    this._AdminService.addUser(formData).subscribe(
      (data) => {
        console.log(data);
        this.isLoading=false;
        if (data.message == 'success') {
          this.SuccessAlertShow=true;
          this.dangerAlertShow=false;
           this.formRegistration.reset();
          this._Router.navigate(['/accounts']);
        } else {
          this.err = 'not valid data';
        }
      },
      (err) => {
        this.isLoading=false;
        this.SuccessAlertShow=false;
        this.dangerAlertShow=true;
        console.log(this.dangerAlertShow);
        console.log(err);
      }
    );
    }
  }


