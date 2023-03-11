import { UserGuard } from './guards/user.guard';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'product/:id', component:ProductDetailComponent},
  {path: 'category/:id', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signUp', component:SignUpComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'cartdetail', component:CartDetailComponent},
  {path: 'checkout', component:CheckoutComponent,canActivate:[UserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
