import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-acounts',
  templateUrl: './acounts.component.html',
  styleUrls: ['./acounts.component.css']
})
export class AcountsComponent implements OnInit {
  formRegistration: FormGroup = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null),
    address: new FormControl(null),
    city: new FormControl(null),
    password: new FormControl(null),
    phone: new FormControl(null),
    region: new FormControl(null),
  });
  err: string | undefined;
  constructor(public _AdminService: AdminService, public _Router: Router) { }

  ngOnInit(): void {
  }
  getFormData(data: any) {
    var formData: any = new FormData();
    formData.append('name', data.get('name').value);
    formData.append('email', data.get('email').value);
    formData.append('address', data.get('address').value);
    formData.append('city', data.get('city').value);
    formData.append('phone', data.get('phone').value);
    formData.append('password', data.get('password').value);
    formData.append('region', data.get('region').value);

    this._AdminService.addUser(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.message == 'User added succesfully') {
          this._Router.navigate(['/login']);
        } else {
          this.err = 'not valid data';
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
