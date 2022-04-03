import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../Service/product-list.service';
import { WishlistService } from '../Service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  likedProducts: any[] = [];
  productArray: any[] = [];
  userID :any;
  count = 0;

  constructor(
    private wishlistService: WishlistService,
    private productListService: ProductListService
  ) {}

  ngOnInit(): void {
    this.productListService.getAllProduct().subscribe(
      (result) => {
        this.productArray = result.products;
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.getLikedProducts();
  }

  getLikedProducts() {
    const user: any = localStorage.getItem('user');
    if(user)
    {
      const userObj = JSON.parse(user);
      this.userID=userObj.user.id;
      console.log(this.userID)
      this.count = 0;
      let queryParams = new HttpParams();
      queryParams = queryParams.append('user_id', this.userID);
      this.wishlistService.getWishlistProducts(queryParams).subscribe(
        (res) => {
          console.log(res);
          for (let i = 0; i < this.productArray.length; i++) {
            if (
              res.products.some(
                (e: { product_id: number; user_id: number }) =>
                  e.product_id == this.productArray[i].id &&
                  e.user_id == this.userID
              )
            ) {
              this.likedProducts[this.count] = this.productArray[i];
              this.count++;
            }
          }
          console.log('like', this.likedProducts);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else
    {
      console.log("user not logged in yet");
    }
   
  }
}
