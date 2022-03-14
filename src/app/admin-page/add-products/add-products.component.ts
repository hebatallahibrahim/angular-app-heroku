import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  formRegistration: FormGroup = new FormGroup({
    prodname: new FormControl(null),
    description: new FormControl(null),
    category: new FormControl(null),
    price: new FormControl(null),
    stock: new FormControl(null),
    quentity: new FormControl(null),
    discount: new FormControl(null),
    image: new FormControl(null),
  });
  constructor() { }

  ngOnInit(): void {
  }
  getFormData(FormData: any) {
    console.log(FormData);
  }
}
