import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Service/admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  arr = [1,2,3,4,5,6,7,8,9,10];
  arr2 = [1,2,3,4,5,6,7,8,9,10];
  categoryArray : any[]=[];
  productArray : any[]=[];
  SubCatArray : any[]=[];
  activetedRoute: any;
  productId: any;
  constructor(private _service : AdminService ) { 

    this._service.getAllCategory()
    .subscribe((data: any) => {
      this.categoryArray = data.category;
      console.log(this.categoryArray)
    }, (err: any) => {
      console.log(err)
    });


    this._service.getAllProduct()
    .subscribe((data: any) => {
      this.productArray = data.products;
      console.log(this.productArray)
    }, (err: any) => {
      console.log(err)
    });
  
  
  this._service.getAllSubCat()
  .subscribe((data: any) => {
      console.log(this.SubCatArray)
    this.SubCatArray = data.category;
    console.log(this.SubCatArray)
  }, (err: any) => {
    console.log(err)
  });
}
  removeCatItem(id: any): void {
   
    // this.productArray.splice(this.productArray.indexOf(item), 1);
    this._service.deleteCategory(id).subscribe(res => {
      console.log(res);
      this.categoryArray = this.categoryArray.filter(item => item.id !== id);
      })
    
  }

  removeProdItem(id: any): void {
    this._service.deleteProduct(id).subscribe(res => {
      console.log(res);
      this.productArray = this.productArray.filter(item => item.id !== id);
      })
    
  }

  removeSubCatItem(id: any): void {
    this._service.deleteSubCat(id).subscribe(res => {
      console.log(res);
      this.SubCatArray = this.SubCatArray.filter(item => item.id !== id);
      })
    
  }
  ngOnInit(): void {
    
  
  }
 
}



