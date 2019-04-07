import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NowishopService } from '../../../../services/nowishop.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../services/http.service';
import { MyWishlistModel } from './my-nowishop-model';

@Component({
  selector: 'app-my-nowishop',
  templateUrl: './my-nowishop.component.html',
  styleUrls: ['./my-nowishop.component.css', './../../my-cart/my-cart.component.css']
})
export class MyNowishopComponent implements OnInit {

  constructor(
  	private nowishopGlobal: NowishopService,
  	private http: HttpClient, 
  	private dataService: HttpService
  	) { }

  userInfo: any;
  requestPrams: any;
  productList: any = [];

  ngOnInit() {
  	this.getUserInfo();
    this.loadModel();
    this.getWishlistProduct();
  }

  getUserInfo(){
  	if(this.nowishopGlobal.isUserInfo()){
  		this.userInfo = this.nowishopGlobal.getUserInfo();
  	}
  }

  loadModel(){
    var userId = this.userInfo.userId;
    this.requestPrams = new MyWishlistModel();
    this.requestPrams.UserID = userId;
  }

  getWishlistProduct(){
    this.http.post(this.dataService.baseUrl + 'UserAccount/GetUserWiseList', this.requestPrams).subscribe(
      res=>{
        this.productList = res['Dt'];
      }
    )
  }

}
