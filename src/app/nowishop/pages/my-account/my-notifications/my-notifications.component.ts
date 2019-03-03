import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../services/http.service';
import { NowishopService } from '../../../../services/nowishop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-notifications',
  templateUrl: './my-notifications.component.html',
  styleUrls: ['./my-notifications.component.css', '../my-account.component.css']
})
export class MyNotificationsComponent implements OnInit {

  constructor(
  	private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService
  	) { }

  notificationOptions: any = [];
  notificationList: any = [];
  userInfo: any;

  ngOnInit() {
  	this.loadModel();
    this.getUserInfo();
  }

  getUserInfo(){
    if(this.nowishopGlobal.isUserInfo()){
      this.userInfo = this.nowishopGlobal.getUserInfo();
    }
  }

  loadModel(){
  	this.notificationOptions = [
  		{
  			"name": "Important Messages",
  			"value": "1",
  			"active": true
  		},
  		{
  			"name": "Promotions",
  			"value": "2",
  			"active": false
  		},
  		{
  			"name": "Coupons",
  			"value": "3",
  			"active": false
  		}
  	];
  }

  changeNotification(val){
  	if(this.notificationOptions.length){
  		this.notificationOptions.forEach((notification)=>{
  			if(notification.value == val){
  				notification.active = true;
          this.http.get(this.dataService.baseUrl + 'UserAccount/GetNotification/1/'+val).subscribe(
            res => {
              this.notificationList = res['Data'];
            }
          )
  			}
  			else{
  				notification.active = false;
  			}
  		})
  	}
  }

}
