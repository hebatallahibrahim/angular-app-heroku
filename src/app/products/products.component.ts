import { Component, OnInit } from '@angular/core';
import  {ProductsService} from '../products.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listProductArray=[];
  constructor(_ProductsService:ProductsService) {
    // let product_Sevice=new ProductsService;
    // product_Sevice.getProductList()
    _ProductsService.getProductList().subscribe( (productListItem)=>
    {
      // console.log(productListItem)
      this.listProductArray=productListItem.results;
      console.log(this.listProductArray)
      // console.log(JSON.stringify())
    },
    (err)=>
      {
        console.log(err);
      });
   }

  ngOnInit(): void {
  }

}
