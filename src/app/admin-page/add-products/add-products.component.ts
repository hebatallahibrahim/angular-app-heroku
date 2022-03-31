import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  dangerAlertShow=false;
  SuccessAlertShow=false;
  isLoading=false;
  formRegistration: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    shortdesc: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    category: new FormControl(null, 
      Validators.required
    ),
    subcategory: new FormControl(null, 
      Validators.required
    ),
    price: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),
    quantity: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),
    discount: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),
    brand: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    productsize:  new FormControl(null, [
      Validators.required
    ]),
    color:new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    status:new FormControl(null),
    file: new FormControl(null, [
      Validators.required
    ]),
    fileSource: new FormControl(null, [
      Validators.required
    ])
  });
  err: string | undefined;
  constructor(public _AdminService: AdminService, public _Router: Router) { }

  categoryArray:any[]=[];
  subCategoryArray:any[]=[];
  
  ngOnInit(): void {
    this._AdminService.getAllCategories().subscribe(
      (res) => {
        this.categoryArray=res.category;
        console.log(this.categoryArray);
      },
      (err:any) => {
        console.log(err);
      }
    ); 
  }

  getSubCategorybyCatID(category_id:any){
    this._AdminService.getAllSubCategoriesbyCat(category_id).subscribe(
      (res) => {
        this.subCategoryArray=res.subcategories;
        console.log(this.subCategoryArray);
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formRegistration.patchValue({
        fileSource: file
      });
    }
  }
  getFormData(data: any) {
    this.isLoading=true;
    var formData: any = new FormData();
    formData.append('name', data.get('name').value);
    formData.append('brand', data.get('brand').value);
    formData.append('category_id', data.get('category').value);
    formData.append('sub_category_id', data.get('subcategory').value);
    formData.append('description', data.get('description').value);
    formData.append('short_desc', data.get('shortdesc').value);
    formData.append('product_size', data.get('productsize').value);
    formData.append('color', data.get('color').value);
    formData.append('product_qty', data.get('quantity').value);
    formData.append('selling_price', data.get('price').value);
    formData.append('discount_price', data.get('discount').value);
    formData.append('image', data.get('fileSource').value);
    formData.append('status', 1);
    formData.append('tags', "tags");
    formData.append('avgRate', 0);

    this._AdminService.addProduct(formData).subscribe(
      (data) => {
        this.isLoading=false;
        console.log(data);
        if (data.message == 'Product added succesfully') {
          this.SuccessAlertShow=true;
          this.dangerAlertShow=false;
           this.formRegistration.reset();
          this._Router.navigate(['/add-product']);
        } else {
          this.err = 'not valid data';
        }
      },
      (err) => {
        this.isLoading=false;
        this.SuccessAlertShow=false;
        this.dangerAlertShow=true;
        console.log(err);
      }
    );
  }
}
