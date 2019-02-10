import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NowishopService {
  cartInfo: any = [];
  cartInfoChange: Subject<any> = new Subject<any>();

  constructor() {
    if(this.isInLocalStorage('user-cart')){
      this.cartInfo = this.getFromLocalStorage('user-cart');
      this.cartInfoChange.next(this.cartInfo);
    }
  } 

  setUserInfo(userInfo){
  	localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  getUserInfo(){
  	if(localStorage.getItem('userInfo')){
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      return userInfo;
    }

    return null;
  }

  isUserInfo(){
    if(localStorage.getItem('userInfo')){
      return true;
    }
    return false;
  }

  deleteUserInfo(){
    if(localStorage.getItem('userInfo')){
      localStorage.removeItem('userInfo');
    }
  }

  isInLocalStorage(name){
    if(localStorage.getItem(name)){
      return true;
    }
    return false;
  }

  setInLocalStorage(name, data){
    debugger
    if(localStorage.getItem(name)){
      localStorage.removeItem(name);
    }
    localStorage.setItem(name, JSON.stringify(data));

    if(name == "user-cart"){
      this.cartInfo = data;
      this.cartInfoChange.next(this.cartInfo);
    }
  }

  getFromLocalStorage(name){
    if(localStorage.getItem(name)){
      var data = JSON.parse(localStorage.getItem(name));
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
