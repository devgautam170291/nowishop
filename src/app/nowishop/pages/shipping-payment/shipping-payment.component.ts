import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { NowishopService } from '../../../services/nowishop.service';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-shipping-payment',
  templateUrl: './shipping-payment.component.html',
  styleUrls: ['./shipping-payment.component.css', '../my-cart/my-cart.component.css']
})
export class ShippingPaymentComponent implements OnInit {

  constructor(private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService) { }

  paymentProgress: any;
  breedcrumb: any;
  cartList: any = [];

  ngOnInit() {
  	this.loadModel();
  	this.showBreedcrumb();
  	this.getMyCart();
  }

  loadModel(){
  	this.paymentProgress = [
  		{
  			"name": "shipping",
  			"active": true
  		},
  		{
  			"name": "payment",
  			"active": false
  		},
  		{
  			"name": "done",
  			"active": false
  		}
  	]
  }

  showBreedcrumb(){
    this.breedcrumb = [
      {
        "name": "Home",
        "url": "/",
        "active": false
      },
      {
        "name": "Cart",
        "url": "/cart",
        "active": false
      },
      {
        "name": "Shipping & Payment",
        "url": "#",
        "active": true
      }
    ];
  }

  getMyCart(){
    var userId = this.nowishopGlobal.getUserInfo().userId;
    this.http.get(this.dataService.baseUrl + 'UserAccount/GetUserCardList/' + userId).subscribe(
      res=>{
        this.cartList = res['Data'];
        this.nowishopGlobal.setInLocalStorage('user-cart', this.cartList);
      }
    )
  }

}
