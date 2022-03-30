import { Component, OnInit } from '@angular/core';
import { adminservice } from 'src/app/Service/admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  productArray : any[]=[];
  imagUrlProduct: string = 'http://127.0.0.1:8000/uploads/product/';
  activetedRoute: any;
  productId: any;
  islogin : boolean=false;
  constructor(
    private _service : adminservice , 
    private rout : Router,
    public _auth: AuthService
    ) { 

      _auth.adminData.subscribe(data=>
        {
          if(data)
         {
           this.islogin=true;
         }
        else
        {
           this.islogin=false;
        }
        })
    }
 
  removeProdItem(id: any): void {
    this._service.deleteProduct(id).subscribe(res => {
      console.log(res);
      this.productArray = this.productArray.filter(item => item.id !== id);
      })
    
  }
  ngOnInit(): void {
    this._service.getAllProduct()
    .subscribe((data: any) => {
      this.productArray = data.products;
      console.log(this.productArray)
    }, (err: any) => {
      console.log(err)
    }); 
  }
 
}



