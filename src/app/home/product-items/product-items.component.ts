import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Service/home.service';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css']
})
export class ProductItemsComponent implements OnInit {
  arr = [1,2,3,4];
  productArray:any[]=[];
  constructor(private _HomeService: HomeService) { }

  ngOnInit(): void {
    this._HomeService.getAllProduct().subscribe(
      (result:any) => {
        if(result.products.length>3){
        this.productArray = result.products.splice(result.products.length-4,4);
        }
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

}
