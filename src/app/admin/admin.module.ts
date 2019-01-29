import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { AdminRoutingModule } from './admin-routing.module';
import { GlobalModule } from './../global/global.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AuthGuard } from './../services/auth.guard';
import { NowishopService } from './../services/nowishop.service';

import { AdminComponent } from './admin.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminSearchComponent } from './admin-search/admin-search.component';
import { AdminBlogsComponent } from './admin-blogs/admin-blogs.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminEmailMarketingComponent } from './admin-email-marketing/admin-email-marketing.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminSeoComponent } from './admin-seo/admin-seo.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddNewCategoryComponent } from './admin-category/add-new-category/add-new-category.component';
import { AddnewproductComponent } from './admin-products/addnewproduct/addnewproduct.component';
import { AddnewuserComponent } from './admin-users/addnewuser/addnewuser.component';

import { HttpService } from '../services/http.service';
import { ValidationHandlerService } from '../services/validation-handler.service';
import { AdminPaginationComponent } from './admin-pagination/admin-pagination.component';
import { ProductTagsComponent } from './admin-products/product-tags/product-tags.component';
import { AddNewProductTagComponent } from './admin-products/product-tags/add-new-product-tag/add-new-product-tag.component';
import { AdminBrandComponent } from './admin-brand/admin-brand.component';
import { AddnewbrandComponent } from './admin-brand/addnewbrand/addnewbrand.component';
import { AdminNotificationComponent } from './admin-notification/admin-notification.component';
import { AddNewNotificationComponent } from './admin-notification/add-new-notification/add-new-notification.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxLoadingModule,
    GlobalModule,
    NgMultiSelectDropDownModule
  ],
  declarations: [
    AdminComponent, 
    AdminNavComponent, 
    AdminSearchComponent, 
    AdminBlogsComponent, 
    AdminCategoryComponent, 
    AdminEmailMarketingComponent, 
    AdminOrdersComponent, 
    AdminProductsComponent, 
    AdminSeoComponent, 
    AdminUsersComponent, 
    AdminDashboardComponent, 
    AddNewCategoryComponent, 
    AddnewproductComponent, 
    AddnewuserComponent, 
    AdminPaginationComponent, ProductTagsComponent, AddNewProductTagComponent, AdminBrandComponent, AddnewbrandComponent, AdminNotificationComponent, AddNewNotificationComponent
  ],
  providers: [
    HttpService,
    ValidationHandlerService,
    AuthGuard,
    NowishopService
  ]
})
export class AdminModule { }
