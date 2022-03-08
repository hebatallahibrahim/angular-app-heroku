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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resetPassword', component: FooterComponent },
  { path: 'signUp', component: RegisterComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-details', component: ProductDetailsComponent }, //don't forgrt to put /:id
  { path: 'cart', component: ProductListComponent }, //add cart page
  { path: 'blogs', component: BlogsPageComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'aboutUs', component: ContactUsComponent }, // add about us component
  { path: 'forgetPass', component: ForgetPasswordComponent },

  { path: 'Cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment', component: PaymentComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
