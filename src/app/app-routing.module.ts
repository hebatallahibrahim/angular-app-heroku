import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BlogsPageComponent } from './blogs-page/blogs-page.component';
import { HomeComponent } from './home/home.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { PaymentComponent } from './cart/payment/payment.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AllProductsComponent } from './admin-page/all-products/all-products.component';
import { AddProductsComponent } from './admin-page/add-products/add-products.component';
import { UpdateProductComponent } from './admin-page/update-product/update-product.component';
import { AcountsComponent } from './admin-page/acounts/acounts.component';
import { LogInComponent } from './admin-page/log-in/log-in.component';
import { AddCategoryComponent } from './admin-page/add-category/add-category.component';
import { DashboardComponent } from './admin-page/dashboard/dashboard.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { AddSubcategoryComponent } from './admin-page/add-subcategory/add-subcategory.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { SliderComponent } from './admin-page/slider/slider.component';
import { TestComponent } from './test/test.component';
import { AllContactUsComponent } from './admin-page/all-contact-us/all-contact-us.component';
import { ViewContactsDataComponent } from './admin-page/view-contacts-data/view-contacts-data.component';
import { AllCategoryComponent } from './admin-page/all-category/all-category.component';
import { AllSubcategoryComponent } from './admin-page/all-subcategory/all-subcategory.component';
import { UpdateCategoryComponent } from './admin-page/update-category/update-category.component';
import { UpdateSubcategoryComponent } from './admin-page/update-subcategory/update-subcategory.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddUsersComponent } from './admin-page/add-users/add-users.component';
import { AddSliderComponent } from './admin-page/add-slider/add-slider.component';

import { CancelSubscriptionComponent } from './cancel-subscription/cancel-subscription.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

import { AdminRegistrationComponent } from './admin-page/admin-registration/admin-registration.component';
import { AdminAuthGuard } from './admin-auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'category-products/:id/:name', component: CategoryProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resetPassword', component: FooterComponent },
  { path: 'signUp', component: RegisterComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent }, //don't forgrt to put /:id
  { path: 'blogs', component: BlogsPageComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'aboutUs', component: AboutUsComponent }, // add about us component
  { path: 'forgetPass', component: ForgetPasswordComponent },
  { path: 'cart', component: CartComponent }, // canActivate: [AuthGuard],
  { path: 'wishlist', component: WishlistComponent },
  { path: 'user-orders', component:UserOrdersComponent},
  { path: 'payment', component: PaymentComponent },
  { path: 'admin',canActivate: [AdminAuthGuard], component: AdminPageComponent },
  { path: 'all-product', component: AllProductsComponent },
  { path: 'add-product', component: AddProductsComponent },
  { path: 'update-product/:postId', component: UpdateProductComponent },
  { path: 'accounts', component: AcountsComponent },
  { path: 'slider', component: SliderComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'add-subcategory', component: AddSubcategoryComponent },
  { path: 'dashbord', component: DashboardComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'cancel-subscription', component: CancelSubscriptionComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'test', component: TestComponent },
  { path: 'message', component: AllContactUsComponent },
  { path: 'contact-view/:postId', component: ViewContactsDataComponent },
  { path: 'all-category', component: AllCategoryComponent },
  { path: 'all-sub-categry', component: AllSubcategoryComponent },
  { path: 'update-category/:postId', component: UpdateCategoryComponent },
  { path: 'update-subcategory/:postId', component: UpdateSubcategoryComponent },
  { path: 'add-users', component: AddUsersComponent },
  { path: 'add-slider', component: AddSliderComponent },
  { path: 'admin-register', component:AdminRegistrationComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
