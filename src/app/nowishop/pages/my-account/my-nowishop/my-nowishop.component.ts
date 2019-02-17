import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NowishopService } from '../../../../services/nowishop.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'app-my-nowishop',
  templateUrl: './my-nowishop.component.html',
  styleUrls: ['./my-nowishop.component.css']
})
export class MyNowishopComponent implements OnInit {

  constructor(
  	private nowishopGlobal: NowishopService,
  	private http: HttpClient, 
  	private dataService: HttpService
  	) { }

  userInfo: any;

  ngOnInit() {
  	this.getUserInfo();
  }

  getUserInfo(){
  	if(this.nowishopGlobal.isUserInfo()){
  		this.userInfo = this.nowishopGlobal.getUserInfo();
  	}
  }

}
