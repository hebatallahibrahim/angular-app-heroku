import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/Model/product.model';

import { ProductListService } from 'src/app/Service/product-list.service';
import { SearchService } from 'src/app/Service/search.service';
import { environment } from 'src/environments/environment';

import { WishlistService } from 'src/app/Service/wishlist.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from './../../Service/cart.service';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  providers: [ConfirmationService],
})
export class ProductItemComponent implements OnInit {
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
    private modalService: NgbModal,
    private wishlistService: WishlistService,
    private router: Router,
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
  confirm1() {
    this.confirmationService.confirm({
      message: 'please login first',
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

  onItemAdded(item: any) {
    // this.productCartService.addProduct(this.productItem);
    const user: any = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userID = userObj.user.id;
      const postData = { product_id: item.id, user_id: this.userID };
      this.cartService.postCart(postData, item);
    } else {
      this.confirm1();
      console.log('user not logged in yet');
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
    if (user) {
      const userObj = JSON.parse(user);
      this.userID = userObj.user.id;
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
      if (
        this.router.url == '/product-list' ||
        this.router.url.split('/')[1] == 'category-products'
      ) {
        this.LikedProductEvent.emit({
          product_id: this.productItem.id,
          heart: this.item_hearted,
        });
      }
    } else {
      this.confirm1();
      console.log('user not logged in yet');
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
