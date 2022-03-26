import { Component, OnInit } from '@angular/core';
import { adminservice } from 'src/app/Service/admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-all-subcategory',
  templateUrl: './all-subcategory.component.html',
  styleUrls: ['./all-subcategory.component.css']
})
export class AllSubcategoryComponent implements OnInit {

  islogin : boolean=false;
  SubCatArray : any[]=[];
  activetedRoute: any;
  productId: any;
  imagUrlSubCat: string = 'http://127.0.0.1:8000/uploads/subcategory/';
  constructor(
    private _service : adminservice , 
    public _auth: AuthService,
    public _Router: Router
  
  ) {
    _auth.adminData.subscribe(data=>
      {
        if(data)
        {
         console.log(data);
         this.islogin=true;
       }
      else
      {
         this.islogin=false;
      }
      })
    }
 
  
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