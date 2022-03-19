import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { adminservice } from 'src/app/Service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product.model';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  id!: any;
  post! :Product;
  
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
    constructor(public _AdminService: AdminService, 
      public _serve:adminservice,
      private activateroute: ActivatedRoute,
      public _Router: Router) { 
      }
  
    categoryArray:any[]=[];
    subCategoryArray:any[]=[];
    
    ngOnInit(): void {

      this.id = this.activateroute.snapshot.params['postId']
      console.log();
      this._serve.find(this.id).subscribe((data: any)=>{
        this.post = data.$product;
      }); 
   
      this._AdminService.getAllCategories().subscribe(
        (res) => {
          this.categoryArray=res.category;
      
        },
        (err:any) => {
          console.log(err);
        }
      );
  
      this._AdminService.getAllSubCategories().subscribe(
        (res) => {
          this.subCategoryArray=res.category;
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

      console.log(data);
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
    
      this._serve.updateProduct(this.id, formData).subscribe((res:any) => {
        console.log(res);
        console.log('Post updated successfully!');
        this._Router.navigate(['/all-product']);
   })

    }

}
