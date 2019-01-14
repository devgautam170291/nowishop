import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login-register/login/login.component';
import { RegisterComponent } from './pages/login-register/register/register.component';
import { ForgetPasswordComponent } from './pages/login-register/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/login-register/reset-password/reset-password.component';
import { CommingSoonComponent } from './pages/comming-soon/comming-soon.component';

const routes: Routes = [
	{ path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
	{ path:'', loadChildren: './nowishop/nowishop.module#NowishopModule'},
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'forget-password', component: ForgetPasswordComponent },
	{ path: 'reset-password/:id', component: ResetPasswordComponent },
	{ path: 'career', component: CommingSoonComponent},
	{ path: 'seller', component: CommingSoonComponent},
	{ path: '**',  redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
