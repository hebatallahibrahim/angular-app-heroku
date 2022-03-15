import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  formRegistration: FormGroup = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    shortdesc: new FormControl(null),
    category: new FormControl(null),
    subcategory: new FormControl(null),
    price: new FormControl(null),
    quantity: new FormControl(null),
    discount: new FormControl(null),
    brand: new FormControl(null),
    productsize: new FormControl(null),
    color:new FormControl(null),
    status:new FormControl(null),
    file: new FormControl(null),
    fileSource: new FormControl(null)
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

    this._AdminService.getAllSubCategories().subscribe(
      (res) => {
        this.subCategoryArray=res.category;
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
        console.log(data);
        if (data.message == 'Product added succesfully') {
          this._Router.navigate(['/all-product']);
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
