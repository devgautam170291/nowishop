import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../services/auth.guard';

import { AdminComponent } from './admin.component';
import { AdminBlogsComponent } from './admin-blogs/admin-blogs.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AddNewCategoryComponent } from './admin-category/add-new-category/add-new-category.component';
import { AdminEmailMarketingComponent } from './admin-email-marketing/admin-email-marketing.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminSeoComponent } from './admin-seo/admin-seo.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddnewproductComponent } from './admin-products/addnewproduct/addnewproduct.component';
import { AddnewuserComponent } from './admin-users/addnewuser/addnewuser.component';
import { ProductTagsComponent } from './admin-products/product-tags/product-tags.component';
import { AddNewProductTagComponent } from './admin-products/product-tags/add-new-product-tag/add-new-product-tag.component';
import { AdminBrandComponent } from './admin-brand/admin-brand.component';
import { AddnewbrandComponent } from './admin-brand/addnewbrand/addnewbrand.component';

const routes: Routes = [
	{path: '', component: AdminComponent, canActivate: [AuthGuard], children: [
		{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
		{path: 'dashboard', component: AdminDashboardComponent},
		{path: 'orders', component: AdminOrdersComponent},
		{path: 'categories', component: AdminCategoryComponent},
		{path: 'categories/addnewcategory', component: AddNewCategoryComponent},
		{path: 'categories/editcategory/:id', component: AddNewCategoryComponent},
		{path: 'brands', component: AdminBrandComponent},
		{path: 'brands/addnewbrand', component: AddnewbrandComponent},
		{path: 'brands/editbrand/:id', component: AddnewbrandComponent},
		{path: 'products', component: AdminProductsComponent},
		{path: 'products/addnewproduct', component: AddnewproductComponent},
		{path: 'products/editproduct/:id', component: AddnewproductComponent},
		{path: 'products/producttag', component: ProductTagsComponent},
		{path: 'products/producttag/addproducttag', component: AddNewProductTagComponent},
		{path: 'products/producttag/editproduct/:id', component: AddNewProductTagComponent},
		{path: 'users', component: AdminUsersComponent},
		{path: 'users/addnewuser', component: AddnewuserComponent},
		{path: 'users/edituser/:id', component: AddnewuserComponent},
		{path: 'blogs', component: AdminBlogsComponent},
		{path: 'seo', component: AdminSeoComponent},
		{path: 'email-marketing', component: AdminEmailMarketingComponent}
	]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
