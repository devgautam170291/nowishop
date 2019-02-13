import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NowishopService {
  cartInfo: any = [];
  cartInfoChange: Subject<any> = new Subject<any>();

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, ) {
    if(this.isInLocalStorage('user-cart')){
      this.cartInfo = this.getFromLocalStorage('user-cart');
      this.cartInfoChange.next(this.cartInfo);
    }
  } 

  setUserInfo(userInfo){
  	this.localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  getUserInfo(){
  	if(this.localStorage.getItem('userInfo')){
      var userInfo = JSON.parse(this.localStorage.getItem('userInfo'));
      return userInfo;
    }

    return null;
  }

  isUserInfo(){
    if(this.localStorage.getItem('userInfo')){
      return true;
    }
    return false;
  }

  deleteUserInfo(){
    if(this.localStorage.getItem('userInfo')){
      this.localStorage.removeItem('userInfo');
    }
  }

  isInLocalStorage(name){
    if(this.localStorage.getItem(name)){
      return true;
    }
    return false;
  }

  setInLocalStorage(name, data){
    debugger
    if(this.localStorage.getItem(name)){
      this.localStorage.removeItem(name);
    }
    this.localStorage.setItem(name, JSON.stringify(data));

    if(name == "user-cart"){
      this.cartInfo = data;
      this.cartInfoChange.next(this.cartInfo);
    }
  }

  getFromLocalStorage(name){
    if(this.localStorage.getItem(name)){
      var data = JSON.parse(this.localStorage.getItem(name));
      return data;
    }
    return null;
  }

  showTimer(currentDateTime: any, endDateTime: any){
    var currentDateTimeVal = currentDateTime.getTime();
    var endDateTimeVal = endDateTime.getTime();
    var diff = endDateTimeVal - currentDateTimeVal;

    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    var timerObj = {
      "days": 0,
      "hours": 0,
      "minutes": 0,
      "seconds": 0,
      "diff": diff
    }

    if(diff > 0){
      timerObj['days'] = Math.floor(diff / (day));
      timerObj['hours'] = Math.floor((diff % (day)) / (hour));
      timerObj['minutes'] = Math.floor((diff % (hour)) / (minute));
      timerObj['seconds'] = Math.floor((diff % (minute)) / second);
    }

    return timerObj;
  }
}
