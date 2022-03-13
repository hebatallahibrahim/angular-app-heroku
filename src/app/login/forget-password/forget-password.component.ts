import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  
  formRegistration: FormGroup = new FormGroup({
    Email: new FormControl(null)  
  });
  constructor() {}

  ngOnInit(): void {}
  getFormData(FormData: any) {
    console.log(FormData.value);
  }
}
