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
  }

 
  removeProdItem(item: any): void {
    console.log(item);
    // this.productArray.splice(this.productArray.indexOf(item), 1);
  }
  ngOnInit(): void {
    this.productId = this.activetedRoute.snapshot.paramMap.get('id'); // get id from url

    console.log(this.productId);
   
  
  }
 
}



