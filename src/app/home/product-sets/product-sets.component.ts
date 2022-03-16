import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SwiperOptions } from 'swiper';
import { HomeService } from 'src/app/Service/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-sets',
  templateUrl: './product-sets.component.html',
  styleUrls: ['./product-sets.component.css']
})
export class ProductSetsComponent implements OnInit {
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  imagUrlCategory: string = 'http://127.0.0.1:8000/uploads/category/';

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
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

  constructor(private fb: FormBuilder,private _HomeService: HomeService, private _Router: Router) {}
    
  categoryArray:any[]=[];

  ngOnInit(): void {
    this._HomeService.getAllCategories().subscribe(
      (res) => {
        this.categoryArray=res.category;
        console.log(this.categoryArray);
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  goToCategoryProducts(categoryItem: any) {
    this._Router.navigate(['/category-products', categoryItem.id,categoryItem.name]); // send id to url
  }

}
