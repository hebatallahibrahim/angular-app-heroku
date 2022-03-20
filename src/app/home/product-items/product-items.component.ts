import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Service/home.service';
import { WishlistService } from 'src/app/Service/wishlist.service';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css']
})
export class ProductItemsComponent implements OnInit {
  arr = [1,2,3,4];
  productArray:any[]=[];
  userID=1;
  likedProducts:any[]=[];
  constructor(private _HomeService: HomeService,private wishlistService:WishlistService) { }

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
    this.getLikedProducts();
  }

  getLikedProducts(){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("user_id",this.userID);
    this.wishlistService.getWishlistProducts(queryParams).subscribe(
      (res) => {
      console.log(res);
      for(let i=0;i<this.productArray.length;i++){
        if (res.products.some((e: { product_id: number;user_id:number; })=> e.product_id == this.productArray[i].id && e.user_id==this.userID)) {
          this.likedProducts[i]=true;
        }else{
          this.likedProducts[i]=false;
        }
      }
      console.log("like",this.likedProducts);
    },
    (err)=>{
      console.log(err);
    }
    );
  }

}
