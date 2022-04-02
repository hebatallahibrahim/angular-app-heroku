import { Component, OnInit } from '@angular/core';
import { adminservice } from 'src/app/Service/admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-subcategory',
  templateUrl: './all-subcategory.component.html',
  styleUrls: ['./all-subcategory.component.css']
})
export class AllSubcategoryComponent implements OnInit {

  
  SubCatArray : any[]=[];
  activetedRoute: any;
  productId: any;
  imagUrlSubCat: string = 'http://127.0.0.1:8000/uploads/subcategory/';
  constructor(
    private _service : adminservice , 
    private rout : Router
    ) { }
 
  
  removeSubCatItem(id: any): void {
    this._service.deleteSubCat(id).subscribe(res => {
      console.log(res);
      this.SubCatArray = this.SubCatArray.filter(item => item.id !== id);
      })
    
  }

  ngOnInit(): void {
  
  this._service.getAllSubCat()
  .subscribe((data: any) => {
      console.log(this.SubCatArray)
    this.SubCatArray = data.category;
    console.log(this.SubCatArray)
  }, (err: any) => {
    console.log(err)
  });
  
  }

}