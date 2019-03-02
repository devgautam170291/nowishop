import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GlobalModule } from './../global/global.module';

import { NowishopRoutingModule } from './nowishop-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { HttpService } from '../services/http.service';
import { ValidationHandlerService } from '../services/validation-handler.service';
import { NowishopService } from './../services/nowishop.service';
import { NowishopComponent } from './nowishop.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeSectionComponent } from './pages/home/home-section/home-section.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { ShowProductComponent } from './components/show-product/show-product.component';
import { ShowCategoriesComponent } from './components/show-categories/show-categories.component';
import { BrowsingHistoryComponent } from './components/browsing-history/browsing-history.component';
import { RecomendedComponent } from './components/recomended/recomended.component';
import { SimilarProductsComponent } from './components/similar-products/similar-products.component';
import { CustomerCareComponent } from './pages/customer-care/customer-care.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HelpCenterComponent } from './pages/help-center/help-center.component';
import { PaymentPolicyComponent } from './pages/help-center/payment-policy/payment-policy.component';
import { PrivacyPolicyComponent } from './pages/help-center/privacy-policy/privacy-policy.component';
import { ShippingComponent } from './pages/help-center/shipping/shipping.component';
import { ReturnPolicyComponent } from './pages/help-center/return-policy/return-policy.component';
import { LoyaltyProgramComponent } from './pages/help-center/loyalty-program/loyalty-program.component';
import { HomeSliderComponent } from './pages/home/home-slider/home-slider.component';
import { DummyProductsComponent } from './components/show-product/dummy-products/dummy-products.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { ShippingPaymentComponent } from './pages/shipping-payment/shipping-payment.component';
import { ProductImgSliderComponent } from './pages/single-product/product-img-slider/product-img-slider.component';
import { AboutProductComponent } from './pages/single-product/about-product/about-product.component';
import { MyNowishopComponent } from './pages/my-account/my-nowishop/my-nowishop.component';
import { MyOrdersComponent } from './pages/my-account/my-orders/my-orders.component';
import { MyWishlistComponent } from './pages/my-account/my-wishlist/my-wishlist.component';
import { MyPointsComponent } from './pages/my-account/my-points/my-points.component';
import { MyNotificationsComponent } from './pages/my-account/my-notifications/my-notifications.component';
import { MyPersonalInfoComponent } from './pages/my-account/my-personal-info/my-personal-info.component';
import { MyShippingAddressComponent } from './pages/my-account/my-shipping-address/my-shipping-address.component';
import { MySecuritySettingComponent } from './pages/my-account/my-security-setting/my-security-setting.component';
import { MyAccountBindingComponent } from './pages/my-account/my-account-binding/my-account-binding.component';
import { SellerComponent } from './pages/seller/seller.component';
import { MyBrowsingHistoryComponent } from './pages/my-account/my-browsing-history/my-browsing-history.component';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';

@NgModule({
  imports: [
    CommonModule,
    NowishopRoutingModule,
    NgxLoadingModule,
    FormsModule,
    HttpClientModule,
    GlobalModule
  ],
  declarations: [
    NowishopComponent,
    HomeComponent,
    HomeSectionComponent,
    HeaderComponent,
    FooterComponent,
    RatingsComponent,
    SectionTitleComponent,
    ShowProductComponent,
    ShowCategoriesComponent,
    BrowsingHistoryComponent,
    RecomendedComponent,
    SimilarProductsComponent,
    CustomerCareComponent,
    AboutUsComponent,
    HelpCenterComponent,
    PaymentPolicyComponent,
    PrivacyPolicyComponent,
    ShippingComponent,
    ReturnPolicyComponent,
    LoyaltyProgramComponent,
    HomeSliderComponent,
    DummyProductsComponent,
    SingleProductComponent,
    MyAccountComponent,
    MyCartComponent,
    ShippingPaymentComponent,
    ProductImgSliderComponent,
    AboutProductComponent,
    MyNowishopComponent,
    MyOrdersComponent,
    MyWishlistComponent,
    MyPointsComponent,
    MyNotificationsComponent,
    MyPersonalInfoComponent,
    MyShippingAddressComponent,
    MySecuritySettingComponent,
    MyAccountBindingComponent,
    SellerComponent,
    MyBrowsingHistoryComponent,
    ProductListingComponent
  ],
  providers: [
    HttpService,
    ValidationHandlerService,
    NowishopService
  ]
})
export class NowishopModule { }
