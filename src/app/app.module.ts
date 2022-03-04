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
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import{HttpClientModule} from '@angular/common/http';
import { BlogsPageComponent } from './blogs-page/blogs-page.component';
import { CarousalComponent } from './home/carousal/carousal.component';
import { ProductItemsComponent } from './home/product-items/product-items.component';
import { ProductSetsComponent } from './home/product-sets/product-sets.component';
import { BlogsComponent } from './home/blogs/blogs.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ContactUsComponent,
    ProductsComponent,
    HomeComponent,
    ProductDetailsComponent,
   
    BlogsPageComponent,
    CarousalComponent,
   
    ProductItemsComponent,
    ProductSetsComponent,
    BlogsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
