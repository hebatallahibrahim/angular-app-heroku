import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { contactUsService } from '../Service/contact-us.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  alert: boolean = false;
  dangerAlertShow = false;
  SuccessAlertShow = false;
  formRegistration: FormGroup = new FormGroup({
    firstname: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
    ]),
    lastname: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    message: new FormControl(null),
  });

  constructor(public contact: contactUsService, public _Router: Router) {}

  ngOnInit(): void {}
  err!: string;
  getFormData(data: any) {
    // console.log(data.value);

    var formData: any = new FormData();
    formData.append('fname', data.get('firstname').value);
    formData.append('lname', data.get('lastname').value);
    formData.append('email', data.get('email').value);
    formData.append('message', data.get('message').value);

    this.contact.registData(formData).subscribe(
      (data) => {
        if (data.message == 'success') {
          this.SuccessAlertShow = true;
          this.dangerAlertShow = false;
          this.formRegistration.reset();
          this._Router.navigate(['/contact-us']);
        } else {
          this.err = 'not valid data';
        }
      },
      (err) => {
        this.SuccessAlertShow = false;
        this.dangerAlertShow = true;
        console.log(err);
      }
    );
    // this.formRegistration.reset();
  }
}
