import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NowishopService } from './nowishop.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router, private nowishopGlobal: NowishopService){

	}
	userInfo: any;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  	if(this.checkLoginStatus()){
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

  checkUserPermission(){
  	if(parseInt(this.userInfo['userRoleId']) == 1){
  		return true;
  	}
  	else {
  		return false;
  	}
  }
}
