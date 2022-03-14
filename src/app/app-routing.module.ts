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
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resetPassword', component: FooterComponent },
  { path: 'signUp', component: RegisterComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent }, //don't forgrt to put /:id
  { path: 'cart', component: ProductListComponent }, //add cart page
  { path: 'product-details', component: ProductDetailsComponent }, //don't forgrt to put /:id
  { path: 'blogs', component: BlogsPageComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'aboutUs', component: AboutUsComponent }, // add about us component
  { path: 'forgetPass', component: ForgetPasswordComponent },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'all-product', component: AllProductsComponent },
  { path: 'add-product', component: AddProductsComponent },
  { path: 'update-product', component: UpdateProductComponent },
  { path: 'accounts', component: AcountsComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'dashbord', component: DashboardComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
