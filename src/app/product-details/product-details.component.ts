import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SwiperOptions } from 'swiper';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductDetailsService } from './../Service/product-details.service';
import { ProductListService } from './../Service/product-list.service';
import { HttpParams } from '@angular/common/http';
import { Product } from '../Model/product.model';
import { WishlistService } from '../Service/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  item_hearted!:any;
  arr = [1, 2, 3, 4];
  array = [1, 2, 3, 4];
  images = [944, 1011, 984].map(
    (n) => `https://picsum.photos/id/${n}/1200/500`
  );
  //public form: FormGroup;
  form: FormGroup = new FormGroup({
    rating: new FormControl(null),
  });
  ratingVal: number=0;
  productId!: any;
  userID:any=1;
  productDetails: any={};
  relativeProduct!: any[];
  imagUrlProduct: string = 'http://127.0.0.1:8000/uploads/product/';
  err: string | undefined;

  constructor(
    private fb: FormBuilder,
    public _Router: Router,
    private activetedRoute: ActivatedRoute,
    private _productDetailsService: ProductDetailsService,
    private productListService: ProductListService,
    private wishlistService:WishlistService
  ) {
    this.activetedRoute.params.subscribe( (params) => {
      this.ratingVal=0;
      this.getProductByID();
      this.getLikedProduct();
      if(this.userID){
        this.getUserRate();
      }
    } );
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
    
  }
  // productCrusal(item: any) {
  //   console.log(item.id);
  // }
  addOrRemoveWishlist() {
    this.item_hearted = !this.item_hearted;
    if (this.item_hearted) {
      var formData: any = new FormData();
      formData.append('product_id', this.productDetails.id);
      formData.append('user_id', this.userID);

      this.wishlistService
        .addToWishlist(formData, this.productDetails.id)
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
        .deleteFromWishlist(queryParams, this.productDetails.id)
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
  }

  getLikedProduct(){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("user_id",this.userID);
    this.wishlistService.getWishlistProducts(queryParams).subscribe(
      (res) => {
      console.log(res);
      console.log("id",this.productDetails);
      console.log("itemheart",this.item_hearted);
      if (res.products.some((e: { product_id: number;user_id:number; })=> e.product_id == this.productDetails.id && e.user_id==this.userID)) {
        this.item_hearted=true;
      }else{
        this.item_hearted=false;
      }
    },
    (err)=>{
      console.log(err);
    }
    );
  }

  getProductByID(){
    this.productId = this.activetedRoute.snapshot.paramMap.get('id'); // get id from url
    this._productDetailsService.getProductByID(this.productId).subscribe(
      (result) => {
        this.productDetails = result.$product;

        this.productListService
          .getProductBySubcategory(this.productDetails.sub_category_id)
          .subscribe(
            (result) => {
              console.log(result);
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

  calculatePrice(product:Product){
    if(product?.discount_price && (+product?.discount_price)!=0){
      return product?.selling_price-(+product?.discount_price);
    }else{
      return product?.selling_price;
    }
  }
  getUserRate(){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("user_id",this.userID);
    this._productDetailsService.getUserRating(queryParams,this.productId).subscribe(
      (res) => {
      console.log(res);  
      if(res.message!='No Rating found'){
      this.ratingVal=res.user_rate.rate;
      }
    },
    (err)=>{
      console.log(err);
    }
    );
  }

  removeRate(){
    this.ratingVal=0;
    let queryParams = new HttpParams();
    queryParams = queryParams.append("user_id",this.userID);
    this._productDetailsService.deleteRating(queryParams,this.productId).subscribe(
      (res) => {
      console.log(res);
      if(res.message=='Rate deleted succesfully'){

        }
    },
    (err)=>{
      console.log(err);
    }
    );
  }
  getFormData(data: any) {
    var formData: any = new FormData();
    formData.append('rate', data.get('rating').value);
    formData.append('product_id', this.productId);
    formData.append('user_id', this.userID);
  
    this._productDetailsService.addProductRating(formData,this.productId).subscribe(
      (data) => {
        console.log(data);
        if (data.message == 'Rate added succesfully' || data.message=='Product Rate updated succesfully') {
          // this._Router.navigate(['/accounts']);
        } else {
          this.err = 'not valid data';
        }
      },
      (err) => {
        console.log(err);
      }
    );
   }
}

