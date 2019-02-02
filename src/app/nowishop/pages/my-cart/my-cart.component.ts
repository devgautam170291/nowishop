import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { NowishopService } from '../../../services/nowishop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService
  ) { }
  breedcrumb: any;
  quantity: any = 1;
  cartList: any = [];

  ngOnInit() {
  	this.showBreedcrumb();
    this.getMyCart();
  }

  showBreedcrumb(){
    this.breedcrumb = [
      {
        "name": "Home",
        "url": "/",
        "active": false
      },
      {
        "name": "My Cart",
        "url": "#",
        "active": true
      }
    ];
  }

  getMyCart(){
    var userId = this.nowishopGlobal.getUserInfo().userId;
    this.http.get(this.dataService.baseUrl + 'UserAccount/GetUserCardList/' + userId).subscribe(
      res=>{
        
      }
    )
  }

  increaseQuantity(){
    this.quantity += 1;
  }

  decreaseQuantity(){
    if(this.quantity > 1){
      this.quantity -= 1;
    }
  }

}
