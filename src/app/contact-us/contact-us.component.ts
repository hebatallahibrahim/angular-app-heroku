import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { contactUsService} from '../Service/contact-us.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  formRegistration: FormGroup = new FormGroup({
   firstname: new FormControl(null),
    lastname: new FormControl(null),
    email: new FormControl(null),
    message: new FormControl(null)
  });
  
  constructor(public contact: contactUsService, public _Router: Router) {}

  ngOnInit(): void {
  }
  getFormData(data: any) {
    // console.log(data.value);

    var formData: any = new FormData();
    formData.append('fname', data.get('firstname').value);
    formData.append('lname', data.get('lastname').value);
    formData.append('email', data.get('email').value);
    formData.append('message', data.get('message').value);
   

    this.contact.registData(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.message == "ContactUs added succesfully") {
          this._Router.navigate(['/contact-us']);
        } 
        // else {
        //   this.err = 'not valid data';
        // }
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
