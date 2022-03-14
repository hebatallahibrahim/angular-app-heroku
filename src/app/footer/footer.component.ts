import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  formRegistration: FormGroup = new FormGroup({
    Email: new FormControl(null)  
  });
  constructor() {}

  ngOnInit(): void {}
  getFormData(FormData: any) {
    console.log(FormData.value);
  }
}
