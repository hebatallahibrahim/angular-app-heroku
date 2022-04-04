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
import { AuthGuard } from './Service/auth.guard';
import { AddSubcategoryComponent } from './admin-page/add-subcategory/add-subcategory.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { SliderComponent } from './admin-page/slider/slider.component';

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
import { AdminLogOutComponent } from './admin-page/admin-log-out/admin-log-out.component';
import { UserLogOutComponent } from './user-log-out/user-log-out.component';
import { UserGuardGuard } from './Service/user-guard.guard';
import { UserGetInfoComponent } from './user-get-info/user-get-info.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { OrderDatailsComponent } from './admin-page/order-datails/order-datails.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderDataComponent } from './admin-page/order-data/order-data.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'category-products/:id/:name', component: CategoryProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resetPassword/:token/:email', component: ResetPasswordComponent },
  { path: 'signUp', component: RegisterComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent }, //don't forgrt to put /:id
  { path: 'blogs', component: BlogsPageComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'aboutUs', component: AboutUsComponent }, // add about us component
  { path: 'forgetPass', component: ForgetPasswordComponent },
  { path: 'cart', canActivate: [UserGuardGuard], component: CartComponent }, // canActivate: [AuthGuard],
  {
    path: 'wishlist',
    canActivate: [UserGuardGuard],
    component: WishlistComponent,
  },
  {
    path: 'user-orders',
    canActivate: [UserGuardGuard],
    component: UserOrdersComponent,
  },
  {
    path: 'order-details/:id',
    canActivate: [UserGuardGuard],
    component: OrderDetailsComponent,
  },
  {
    path: 'payment',
    canActivate: [UserGuardGuard],
    component: PaymentComponent,
  },
  { path: 'admin', canActivate: [AuthGuard], component: AdminPageComponent },
  {
    path: 'all-product',
    canActivate: [AuthGuard],
    component: AllProductsComponent,
  },
  {
    path: 'add-product',
    canActivate: [AuthGuard],
    component: AddProductsComponent,
  },
  {
    path: 'update-product/:postId',
    canActivate: [AuthGuard],
    component: UpdateProductComponent,
  },
  { path: 'accounts', canActivate: [AuthGuard], component: AcountsComponent },
  { path: 'slider', canActivate: [AuthGuard], component: SliderComponent },
  { path: 'log-in', component: LogInComponent },
  {
    path: 'add-category',
    canActivate: [AuthGuard],
    component: AddCategoryComponent,
  },
  {
    path: 'add-subcategory',
    canActivate: [AuthGuard],
    component: AddSubcategoryComponent,
  },
  { path: 'dashbord', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'cancel-subscription', component: CancelSubscriptionComponent },
  {
    path: 'check-out',
    canActivate: [UserGuardGuard],
    component: CheckOutComponent,
  },
  {
    path: 'profile',
    canActivate: [UserGuardGuard],
    component: ProfileComponent,
  },

  {
    path: 'message',
    canActivate: [AuthGuard],
    component: AllContactUsComponent,
  },
  {
    path: 'contact-view/:postId',
    canActivate: [AuthGuard],
    component: ViewContactsDataComponent,
  },
  {
    path: 'order-view/:postId',
    canActivate: [AuthGuard],
    component: OrderDataComponent,
  },
  {
    path: 'all-category',
    canActivate: [AuthGuard],
    component: AllCategoryComponent,
  },
  {
    path: 'all-sub-categry',
    canActivate: [AuthGuard],
    component: AllSubcategoryComponent,
  },
  {
    path: 'update-category/:postId',
    canActivate: [AuthGuard],
    component: UpdateCategoryComponent,
  },
  {
    path: 'update-subcategory/:postId',
    canActivate: [AuthGuard],
    component: UpdateSubcategoryComponent,
  },
  { path: 'add-users', canActivate: [AuthGuard], component: AddUsersComponent },
  {
    path: 'add-slider',
    canActivate: [AuthGuard],
    component: AddSliderComponent,
  },
  {
    path: 'admin-register',
    canActivate: [AuthGuard],
    component: AdminRegistrationComponent,
  },
  { path: 'admin-log-out', component: AdminLogOutComponent },
  { path: 'user-log-out', component: UserLogOutComponent },
  { path: 'info', component: UserGetInfoComponent },
  { path: 'admin-order', component: OrderDatailsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
