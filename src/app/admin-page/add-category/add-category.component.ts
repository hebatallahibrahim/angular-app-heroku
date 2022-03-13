import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  formRegistration: FormGroup = new FormGroup({
    englishProduct: new FormControl(null),
    arabicProduct: new FormControl(null),
  
  });
  constructor() { }

  ngOnInit(): void {
  }
  getFormData(FormData: any) {
    console.log(FormData);
  }
}
