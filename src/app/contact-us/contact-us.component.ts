import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
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
  constructor() { }

  ngOnInit(): void {
  }
  getFormData(FormData: any) {
    console.log(FormData.value);
  }

}
