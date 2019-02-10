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

  ngOnInit() {
  	this.loadModel();
  }

  loadModel(){
  	this.notificationOptions = [
  		{
  			"name": "Important Messages",
  			"value": "important-messages",
  			"active": true
  		},
  		{
  			"name": "Promotions",
  			"value": "promotions",
  			"active": false
  		},
  		{
  			"name": "Coupons",
  			"value": "coupons",
  			"active": false
  		}
  	];
  }

  changeNotification(val){
  	if(this.notificationOptions.length){
  		this.notificationOptions.forEach((notification)=>{
  			if(notification.value == val){
  				notification.active = true;
  			}
  			else{
  				notification.active = false;
  			}
  		})
  	}
  }

}
