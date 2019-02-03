import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { ValidationHandlerService } from './services/validation-handler.service';
import { NowishopService } from './services/nowishop.service';
import { LoginComponent } from './pages/login-register/login/login.component';
import { RegisterComponent } from './pages/login-register/register/register.component';
import { ForgetPasswordComponent } from './pages/login-register/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/login-register/reset-password/reset-password.component';
import { CommingSoonComponent } from './pages/comming-soon/comming-soon.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    CommingSoonComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLoadingModule,
    FormsModule
  ],
  providers: [
  	HttpService,
  	ValidationHandlerService,
  	NowishopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
