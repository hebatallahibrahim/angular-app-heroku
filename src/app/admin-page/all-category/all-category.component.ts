import { Component, OnInit } from '@angular/core';
import { adminservice } from 'src/app/Service/admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.css']
})
export class AllCategoryComponent implements OnInit {
 
    categoryArray : any[]=[];
    imagUrlCategory: string = 'http://127.0.0.1:8000/uploads/category/';
    activetedRoute: any;
    productId: any;
    constructor(
      private _service : adminservice , 
      public _Router: Router
      ) { 
        
      }
    removeCatItem(id: any): void {
     
     
      this._service.deleteCategory(id).subscribe(res => {
        console.log(res);
        this.categoryArray = this.categoryArray.filter(item => item.id !== id);
        })
      
    }

    ngOnInit(): void {
      this._service.getAllCategory()
      .subscribe((data: any) => {
        this.categoryArray = data.category;
        console.log(this.categoryArray)
      }, (err: any) => {
        console.log(err)
      });
  
  
    
    }

}
