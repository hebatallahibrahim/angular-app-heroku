import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { ProductDetailsComponent } from './product-list/product-details/product-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductFilterComponent } from './product-list/product-filter/product-filter.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ProductListService } from './Service/product-list.service';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogsPageComponent } from './blogs-page/blogs-page.component';
import { CarousalComponent } from './home/carousal/carousal.component';
import { ProductItemsComponent } from './home/product-items/product-items.component';
import { ProductSetsComponent } from './home/product-sets/product-sets.component';
import { BlogsComponent } from './home/blogs/blogs.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ContactUsComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    NotFoundComponent,
    ProductFilterComponent,
    ProductsComponent,
    HomeComponent,
    BlogsPageComponent,
    CarousalComponent,
    ProductItemsComponent,
    ProductSetsComponent,
    BlogsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxUsefulSwiperModule,
    NgxStarRatingModule,
    HttpClientModule,
  ],
  providers: [ProductListService],

  bootstrap: [AppComponent],
})
export class AppModule {}
