import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductFilterComponent } from './product-list/product-filter/product-filter.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ProductListService } from './Service/product-list.service';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogsPageComponent } from './blogs-page/blogs-page.component';
import { CarousalComponent } from './home/carousal/carousal.component';
import { ProductItemsComponent } from './home/product-items/product-items.component';
import { ProductSetsComponent } from './home/product-sets/product-sets.component';
import { BlogsComponent } from './home/blogs/blogs.component';
import { CartComponent } from './cart/cart.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from '../matrial.module';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { PaymentComponent } from './cart/payment/payment.component';
import { FormComponent } from './form/form.component';
import { MatInputModule } from '@angular/material/input';
import { ProfileComponent } from './profile/profile.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AllProductsComponent } from './admin-page/all-products/all-products.component';
import { UpdateProductComponent } from './admin-page/update-product/update-product.component';
import { DashboardComponent } from './admin-page/dashboard/dashboard.component';
import { AcountsComponent } from './admin-page/acounts/acounts.component';
import { NavnarComponent } from './admin-page/navnar/navnar.component';
import { AddProductsComponent } from './admin-page/add-products/add-products.component';
import { LogInComponent } from './admin-page/log-in/log-in.component';
import { AddCategoryComponent } from './admin-page/add-category/add-category.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { TestComponent } from './test/test.component';
import { DropdownComponent } from './shared/dropdown/dropdown/dropdown.component';

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
    HomeComponent,
    BlogsPageComponent,
    CarousalComponent,
    ProductItemsComponent,
    ProductSetsComponent,
    BlogsComponent,
    CartComponent,
    CartItemComponent,
    CheckoutComponent,
    PaymentComponent,
    FormComponent,
    ProfileComponent,
    AdminPageComponent,
    AllProductsComponent,
    UpdateProductComponent,
    DashboardComponent,
    AcountsComponent,
    NavnarComponent,
    AddProductsComponent,
    LogInComponent,
    AddCategoryComponent,
    AboutUsComponent,
    CheckOutComponent,
    TestComponent,
    DropdownComponent,
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
    MatNativeDateModule,
    MaterialExampleModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [ProductListService],

  bootstrap: [AppComponent],
})
export class AppModule {}
