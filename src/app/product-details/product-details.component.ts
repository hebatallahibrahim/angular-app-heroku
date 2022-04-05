import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SwiperOptions } from 'swiper';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductDetailsService } from './../Service/product-details.service';
import { ProductListService } from './../Service/product-list.service';
import { HttpParams } from '@angular/common/http';
import { Product } from '../Model/product.model';
import { WishlistService } from '../Service/wishlist.service';
import { CartService } from '../Service/cart.service';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PaymentService } from '../Service/payment.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [ConfirmationService],
})
export class ProductDetailsComponent implements OnInit {
  item_hearted!: any;
  arr = [1, 2, 3, 4];
  array = [1, 2, 3, 4];
  images = [944, 1011, 984].map(
    (n) => `https://picsum.photos/id/${n}/1200/500`
  );
  ratingVal!: number;
  productId!: any;
  userID: any;
  productDetails!: any;
  relativeProduct!: any[];
  imagUrlProduct: string = 'http://127.0.0.1:8000/uploads/product/';
  err: string | undefined;
  msgs: Message[] = [];
  orderItems: any[] = [];
  order_products: any[] = [];
  order_id: any;
  openRate = false;
  isLoading = true;
  constructor(
    private fb: FormBuilder,
    public _Router: Router,
    private activetedRoute: ActivatedRoute,
    private _productDetailsService: ProductDetailsService,
    private productListService: ProductListService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private paymentService: PaymentService
  ) {
    this.activetedRoute.params.subscribe((params) => {
      this.ratingVal = 0;
      this.getProductByID();
      this.getLikedProduct();
      const user: any = localStorage.getItem('user');
      if (user) {
        const userObj = JSON.parse(user);
        this.userID = userObj.user.id;
        this.getUserRate();
      }
    });
  }
  confirm2() {
    this.confirmationService.confirm({
      message: 'Please buy this product first',
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
        this._Router.navigate(['/login']);
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  slidesStore = [
    { id: 1, img: 'https://picsum.photos/350/150' },
    { id: 2, img: 'https://picsum.photos/350/150' },
    { id: 3, img: 'https://picsum.photos/350/150' },
    { id: 4, img: 'https://picsum.photos/350/150' },
    { id: 5, img: 'https://picsum.photos/350/150' },
    { id: 6, img: 'https://picsum.photos/350/150' },
    { id: 7, img: 'https://picsum.photos/350/150' },
  ];

  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 50,
  };
  ngOnInit() {
    this.getProductByID();
    this.primengConfig.ripple = true;
    this.getOrderProducts();
  }

  addOrRemoveWishlist() {
    const user: any = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userID = userObj.user.id;

      this.item_hearted = !this.item_hearted;
      if (this.item_hearted) {
        var formData: any = new FormData();
        formData.append('product_id', this.productDetails.id);
        formData.append('user_id', this.userID);

        this.wishlistService
          .addToWishlist(formData, this.productDetails.id)
          .subscribe(
            (data) => {
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
          .deleteFromWishlist(queryParams, this.productDetails.id)
          .subscribe(
            (res) => {
              if (res.message == 'Wishlist deleted succesfully') {
              }
            },
            (err) => {
              console.log(err);
            }
          );
      }
    } else {
      this.confirm1();
    }
  }

  getLikedProduct() {
    const user: any = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userID = userObj.user.id;

      let queryParams = new HttpParams();
      queryParams = queryParams.append('user_id', this.userID);
      this.wishlistService.getWishlistProducts(queryParams).subscribe(
        (res) => {
          if (
            res.products.some(
              (e: { product_id: number; user_id: number }) =>
                e.product_id == this.productDetails.id &&
                e.user_id == this.userID
            )
          ) {
            this.item_hearted = true;
          } else {
            this.item_hearted = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.confirm1();
    }
  }

  getProductByID() {
    this.productId = this.activetedRoute.snapshot.paramMap.get('id'); // get id from url
    this._productDetailsService.getProductByID(this.productId).subscribe(
      (result) => {
        this.productDetails = result.$product;

        this.productListService
          .getProductBySubcategory(this.productDetails.sub_category_id)
          .subscribe(
            (result) => {
              this.relativeProduct = result.message;
            },
            (err) => {
              console.log(err);
            }
          );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goTodetails(productItem: any) {
    this._Router.navigate(['/product-details', productItem.id]); // send id to url
  }

  calculatePrice(product: Product) {
    if (product?.discount_price && +product?.discount_price != 0) {
      return product?.selling_price - +product?.discount_price;
    } else {
      return product?.selling_price;
    }
  }

  getUserRate() {
    const user: any = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userID = userObj.user.id;

      let queryParams = new HttpParams();
      queryParams = queryParams.append('user_id', this.userID);
      this._productDetailsService
        .getUserRating(queryParams, this.productId)
        .subscribe(
          (res) => {
            if (res.message != 'No Rating found') {
              this.ratingVal = res.user_rate.rate;
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.confirm1();
    }
  }

  removeRate() {
    const user: any = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userID = userObj.user.id;

      this.ratingVal = 0;
      let queryParams = new HttpParams();
      queryParams = queryParams.append('user_id', this.userID);
      this._productDetailsService
        .deleteRating(queryParams, this.productId)
        .subscribe(
          (res) => {
            if (res.message == 'Rate deleted succesfully') {
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.confirm1();
    }
  }

  getOrderProducts() {
    this.productId = this.activetedRoute.snapshot.paramMap.get('id');
    const user: any = localStorage.getItem('user');

    if (user) {
      const userObj = JSON.parse(user);
      this.paymentService.getAllUserOrders(userObj.user.email).subscribe(
        (data) => {
          console.log(data);
          this.isLoading = false;
          this.orderItems = data.orders;
          this.orderItems.forEach((index) => {
            console.log(index);

            this.paymentService.getOrderItems(index.id).subscribe({
              next: (res) => {
                this.order_products = res.orderItems;
                this.order_id = this.order_products.some(
                  (item) => item.product_id == this.productId
                );
                switch (this.order_id) {
                  case true:
                    this.openRate = true;
                    break;
                }
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {},
            });
          });
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
    } else {
      console.log('error');
    }
  }
  getFormData(data: any) {
    this.productId = this.activetedRoute.snapshot.paramMap.get('id');
    const user: any = localStorage.getItem('user');
    if (user && this.openRate == true) {
      const userObj = JSON.parse(user);
      this.userID = userObj.user.id;
      console.log(this.userID);
      var formData: any = new FormData();
      formData.append('rate', this.ratingVal);
      formData.append('product_id', this.productId);
      formData.append('user_id', this.userID);

      console.log(this.ratingVal);
      this._productDetailsService
        .addProductRating(formData, this.productId)
        .subscribe(
          (data) => {
            if (
              data.message == 'Rate added succesfully' ||
              data.message == 'Product Rate updated succesfully'
            ) {
              this.getProductByID();
            } else {
              this.err = 'not valid data';
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      if (!user) {
        this.confirm1();
      } else {
        this.confirm2();
      }
    }
  }
  onItemAdded(item: any) {
    const user: any = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userID = userObj.user.id;
      const postData = { product_id: item.id, user_id: this.userID };
      this.cartService.postCart(postData, item);
    } else {
      this.confirm1();
    }
  }
}
