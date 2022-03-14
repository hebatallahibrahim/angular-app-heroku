import { Component, OnInit } from '@angular/core';
import  {ProductsService} from '../products.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  listProductArray=[];
  constructor(_ProductsService:ProductsService) {
    // let product_Sevice=new ProductsService;
    // product_Sevice.getProductList()
    _ProductsService.getProductList().subscribe( (productListItem)=>
    {
      // console.log(productListItem)
      this.listProductArray=productListItem.results;
      console.log(this.listProductArray)
    
    },
    (err)=>
      {
        console.log(err);
      });
   }

  ngOnInit(): void {
  }

}
