import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  formRegistration: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null),
  
  });
  constructor() { }

  ngOnInit(): void {
  }
  getFormData(FormData: any) {
    console.log(FormData);
  }

}
