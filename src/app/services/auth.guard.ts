import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute  } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NowishopService } from './nowishop.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
    private router: Router, 
    private nowishopGlobal: NowishopService,
    private route: ActivatedRoute,
    private location: Location){

	}
	userInfo: any;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  	if(this.checkLoginStatus()){
      if(this.checkUserPermission(state)){

      }
  		return true;
  	}
    
    this.router.navigate(['/login'], { queryParams: { returnTo: state.url }});
    return false;
  }

  checkLoginStatus(){
    
  	if(this.nowishopGlobal.isUserInfo()){
  		this.userInfo = this.nowishopGlobal.getUserInfo();
  		return true;
  	}
  	else {
  		return false;
  	}
  }

  checkUserPermission(state: RouterStateSnapshot){

  	if(state.url.includes('admin') && parseInt(this.userInfo['userRoleId']) != 101){
  		return true;
  	}
  	else if(state.url.includes('account')) {
  		return true;
  	}
    else {
      return false;
    }
  }
}
