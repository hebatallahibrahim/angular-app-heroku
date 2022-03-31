import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/Model/product.model';

import { ProductListService } from 'src/app/Service/product-list.service';
import { SearchService } from 'src/app/Service/search.service';
import { environment } from 'src/environments/environment';
import { ProductCartService } from './../../Service/productCart.service';
import { WishlistService } from 'src/app/Service/wishlist.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from './../../Service/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
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
    private modalService: NgbModal,
    private wishlistService: WishlistService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}
  onItemAdded(item: any) {
    // this.productCartService.addProduct(this.productItem);
    const postData = { product_id: item.id, user_id: this.userID };
    this.cartService.postCart(postData, item);
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
    if (this.router.url == '/product-list' || this.router.url.split('/')[1]=='category-products') {
      this.LikedProductEvent.emit({
        product_id: this.productItem.id,
        heart: this.item_hearted,
      });
    }
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
