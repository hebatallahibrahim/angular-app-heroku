import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { ProductCartService } from 'src/app/Service/productCart.service';
import { SearchService } from 'src/app/Service/search.service';
import { WishlistService } from 'src/app/Service/wishlist.service';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/Service/cart.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product-item-row',
  templateUrl: './product-item-row.component.html',
  styleUrls: ['./product-item-row.component.css']
})
export class ProductItemRowComponent implements OnInit {
  @Output() LikedProductEvent = new EventEmitter<any>();
  @Input()
  productItem!: Product;
  imagUrlProduct = environment.imagUrlProduct;
  err: string | undefined;
  userID = 1;
  @Input()
  item_hearted!: any;
  closeResult = '';
  constructor(
    private CartService: CartService,
    private wishlistService: WishlistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private productCartService: ProductCartService) { }

  ngOnInit(): void {
  }

  onItemAdded() {
    // this.CartService.addToCart(this.productItem);
    this.productCartService.addProduct(this.productItem);
  }
  addToCart(item: Product) {
    this.productCartService.addProduct(item);
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
    if(this.router.url=='/product-list'){
      console.log("hi");
    this.LikedProductEvent.emit({product_id:this.productItem.id,heart:this.item_hearted});
    }
  }
}
