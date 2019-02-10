import { Component, OnInit } from '@angular/core';
import { MyWishlistModel } from './my-wishlist-model';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../services/http.service';
import { NowishopService } from '../../../../services/nowishop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.css']
})
export class MyWishlistComponent implements OnInit {

  productList: any = [];
  dummyProducts: any = [];
  requestPrams: any;
  showDummy: any = true;

  constructor(
  	private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService
  	) { }

  ngOnInit() {
  	this.loadModel();
  	this.loadDummyProducts();
  	this.getWishlistProduct();
  }

  loadModel(){
  	var userId = this.nowishopGlobal.getUserInfo().userId;
  	this.requestPrams = new MyWishlistModel();
  	this.requestPrams.UserID = userId;

  }

  loadDummyProducts(){
    for(let i=0; i<18; i++){
      this.dummyProducts.push({"dummy": true});
    }
  }

  getWishlistProduct(){
  	this.http.post(this.dataService.baseUrl + 'UserAccount/GetUserWiseList', this.requestPrams).subscribe(
  		res=>{
  			this.showDummy = false;
  			this.productList = res['Dt'];
  		}
  	)
  }

}
