import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../Service/product-list.service';
import { WishlistService } from '../Service/wishlist.service';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  providers: [ConfirmationService],
})
export class WishlistComponent implements OnInit {
  likedProducts: any[] = [];
  productArray: any[] = [];
  userID: any;
  count = 0;
  msgs: Message[] = [];
  position!: string;
  constructor(
    private wishlistService: WishlistService,
    private productListService: ProductListService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
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
  confirm1() {
    this.confirmationService.confirm({
      message: 'Please login to have wishlist',
      header: 'Attention',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmed',
            detail: 'You have accepted',
          },
        ];
        this.router.navigate(['/login']);
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Rejected',
            detail: 'You have rejected',
          },
        ];
      },
    });
  }
  getLikedProducts() {
    const user: any = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userID = userObj.user.id;
      console.log(this.userID);
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
    } else {
      this.confirm1();
      console.log('user not logged in yet');
    }
  }
}
