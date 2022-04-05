import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product.model';

import { SearchService } from 'src/app/Service/search.service';
import { WishlistService } from 'src/app/Service/wishlist.service';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/Service/cart.service';
import { HttpParams } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
@Component({
  selector: 'app-product-item-row',
  templateUrl: './product-item-row.component.html',
  styleUrls: ['./product-item-row.component.css'],
  providers: [ConfirmationService]
})
export class ProductItemRowComponent implements OnInit {
  @Output() LikedProductEvent = new EventEmitter<any>();
  @Input()
  productItem!: Product;
  imagUrlProduct = "http://127.0.0.1:8000/uploads/product/";
  err: string | undefined;
  userID: any;
  msgs: Message[] = [];
  position!: string;
  @Input()
  item_hearted!: any;
  closeResult = '';
  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService, 
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
  confirm1() {
    this.confirmationService.confirm({
        message: 'please log in to add product',
        header: 'Attention',
        icon: 'pi pi-exclamation-triangle',
    });
}
  onItemAdded(item: any) {
    const user: any = localStorage.getItem('user');
    if(user)
    {
    const userObj = JSON.parse(user);
    this.userID=userObj.user.id;
    console.log(this.userID)
    const postData = { product_id: item.id, user_id: this.userID };
    this.cartService.postCart(postData, item);
    }
    else
    {
      this. confirm1();
    console.log("user not logged in yet");
    }

  }

  goTodetails(productItem: any) {
    this.router.navigate(['/product-details', productItem.id]); // send id to url
  }

  calculatePrice(product: Product) {
    if (product.discount_price) {
      return product.selling_price - +product.discount_price;
    } else {
      return product.selling_price;
    }
  }

  addOrRemoveWishlist() {
    const user: any = localStorage.getItem('user');
    if(user)
    {
    const userObj = JSON.parse(user);
    this.userID=userObj.user.id;
    console.log(this.userID)
    this.item_hearted = !this.item_hearted;
    if (this.item_hearted) {
      var formData: any = new FormData();
      formData.append('product_id', this.productItem.id);
      formData.append('user_id', this.userID);

      this.wishlistService
        .addToWishlist(formData, this.productItem.id)
        .subscribe(
          (data) => {
            console.log(data);
            if (data.message == 'Product updated succesfully') {
              // this._Router.navigate(['/accounts']);
            } else {
              this.err = 'not valid data';
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      let queryParams = new HttpParams();
      queryParams = queryParams.append('user_id', this.userID);
      this.wishlistService
        .deleteFromWishlist(queryParams, this.productItem.id)
        .subscribe(
          (res) => {
            console.log(res);
            if (res.message == 'Wishlist deleted succesfully') {
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
    if (this.router.url == '/product-list') {
      console.log('hi');
      this.LikedProductEvent.emit({
        product_id: this.productItem.id,
        heart: this.item_hearted,
      });
    }
  }
  else
  {
    this. confirm1();
    console.log("user not logged in yet");
  }
  }
}
