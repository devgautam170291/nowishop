import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../services/auth.guard';

import { NowishopComponent } from './nowishop.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomerCareComponent } from './pages/customer-care/customer-care.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HelpCenterComponent } from './pages/help-center/help-center.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { ShippingPaymentComponent } from './pages/shipping-payment/shipping-payment.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';

const routes: Routes = [
	{
		path: '', component: NowishopComponent, children: [
			{path: '', component: HomeComponent},
			{path: 'customer-care', component: CustomerCareComponent},
			{path: 'about-us', component: AboutUsComponent},
			{path: 'help-center', component: HelpCenterComponent},
			{path: 'help-center/:name', component: HelpCenterComponent},
			{path: 'product/:product_slug', component: SingleProductComponent},
			{path: 'category/:cat_slug', component: SingleCategoryComponent},
			{path: 'shipping-payment', component: ShippingPaymentComponent},
			{path: 'cart', component: MyCartComponent},
			{path: 'search/:search_value', component: SearchResultComponent},
			{path: 'account', canActivate: [AuthGuard], component: MyAccountComponent},
			{path: 'account/:name', canActivate: [AuthGuard], component: MyAccountComponent}
	]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class NowishopRoutingModule { }
