import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Product } from '../Model/product.model';
import { HomeService } from '../Service/home.service';
import { ProductListService } from '../Service/product-list.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  productArray!: Product[];
  categoryId:any;
  categoryName:any;
  constructor(private _HomeService: HomeService,public router: Router,private activetedRoute: ActivatedRoute) {
    this.activetedRoute.params.subscribe( (params) => {
      this.getCategoryData();
    } );
  }

  
  ngOnInit(): void {
    
  }

  getCategoryData(){
    this.categoryId = this.activetedRoute.snapshot.paramMap.get('id'); // get id from url
    this.categoryName = this.activetedRoute.snapshot.paramMap.get('name');

    console.log(this.categoryId);
    this._HomeService
      .getCategoryProducts(this.categoryId)
      .subscribe((data: any) => {
        this.productArray = data.message;
        console.log(this.productArray);
    });
  }

}
