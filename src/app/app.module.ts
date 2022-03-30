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
import { AddSubcategoryComponent } from './admin-page/add-subcategory/add-subcategory.component';
import { ItemsComponent } from './product-list/items/items.component';
import { FilterPipe } from './shared/filter.pipe';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { SliderComponent } from './admin-page/slider/slider.component';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion'; //accordion and accordion tab
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CartService } from './Service/cart.service';
import { ProductCartService } from './Service/productCart.service';
import { AllContactUsComponent } from './admin-page/all-contact-us/all-contact-us.component';
import { ContactItemsComponent } from './admin-page/contact-items/contact-items.component';
import { ViewDetailsComponent } from './admin-page/view-details/view-details.component';
import { ViewContactsDataComponent } from './admin-page/view-contacts-data/view-contacts-data.component';
import { AllCategoryComponent } from './admin-page/all-category/all-category.component';
import { UpdateCategoryComponent } from './admin-page/update-category/update-category.component';
import { AllSubcategoryComponent } from './admin-page/all-subcategory/all-subcategory.component';
import { UpdateSubcategoryComponent } from './admin-page/update-subcategory/update-subcategory.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AddUsersComponent } from './admin-page/add-users/add-users.component';
import { AddSliderComponent } from './admin-page/add-slider/add-slider.component';
import { ProductItemRowComponent } from './product-list/product-item-row/product-item-row.component';
import { PaginatorModule } from 'primeng/paginator';
import { CancelSubscriptionComponent } from './cancel-subscription/cancel-subscription.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AdminRegistrationComponent } from './admin-page/admin-registration/admin-registration.component';

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
    AddSubcategoryComponent,
    ItemsComponent,
    FilterPipe,
    CategoryProductsComponent,
    SliderComponent,
    AllContactUsComponent,
    ContactItemsComponent,
    ViewDetailsComponent,
    ViewContactsDataComponent,
    AllCategoryComponent,
    UpdateCategoryComponent,
    AllSubcategoryComponent,
    UpdateSubcategoryComponent,
    WishlistComponent,
    AddUsersComponent,
    AddSliderComponent,
    ProductItemRowComponent,
    CancelSubscriptionComponent,
    UserOrdersComponent,
    AdminRegistrationComponent,
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
    AccordionModule,
    SidebarModule,
    ButtonModule,
    BadgeModule,
    InputNumberModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    ConfirmDialogModule,
    InputTextareaModule,
    MessagesModule,
    MessageModule,
    PaginatorModule,
    ProgressSpinnerModule
  ],
  providers: [
    ProductListService,
    MessageService,
    ConfirmationService,
    CartService,
    ProductCartService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
