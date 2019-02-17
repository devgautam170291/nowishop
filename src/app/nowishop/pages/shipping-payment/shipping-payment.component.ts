import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { NowishopService } from '../../../services/nowishop.service';
import { Router } from '@angular/router';
import { MyShippingModel, PaymentModel } from './shipping-payment-model';
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
  addressList: any = [];
  model: any;
  userInfo: any;
  paymentModel:any;

  ngOnInit() {
  	this.loadModel();
  	this.showBreedcrumb();
  	this.getMyCart();
    this.getUserInfo();
    this.getAddressList();
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
  	];
    this.model = new MyShippingModel();
    this.paymentModel = new PaymentModel();
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

  getUserInfo(){
    if(this.nowishopGlobal.isUserInfo()){
      this.userInfo = this.nowishopGlobal.getUserInfo();
    }
  }

  openAddressModal(){
    $('#addAddressModal').modal('show');
  }

  addAddress(){
    $('#addAddressModal').modal('hide');
    this.model.ShippingAddress = JSON.stringify(this.model.ShippingAddress);
    this.model.UserID = this.userInfo.userId;
    this.http.post(this.dataService.baseUrl + 'UserAccount/AddUserShippingAddress', this.model).subscribe(
      res=>{
        this.model.ShippingAddress = JSON.parse(this.model.ShippingAddress);
        this.addressList.push(this.model);    
        this.loadModel();
      }
    )
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

  getAddressList(){
    var userId = this.nowishopGlobal.getUserInfo().userId;
    this.http.get(this.dataService.baseUrl + 'UserAccount/GetUserShippingAddress/' + userId).subscribe(
      res=>{
        this.addressList = res['Data'].map((data)=>{
          data.ShippingAddress = JSON.parse(data.ShippingAddress);
          return data;
        });
      }
    )
  }

  checkout(){
    var formData = new FormData();
    formData.append('sid', '901403184');
    formData.append('mode', '2CO');
    formData.append('li_0_type', 'product');
    formData.append('li_0_name', 'Monthly Subscription');
    formData.append('li_0_quantity', '2');
    formData.append('li_0_price', '1.00');
    formData.append('li_1_type', 'product');
    formData.append('li_1_name', 'Monthly Subscription');
    formData.append('li_1_price', '1.00');
    formData.append('li_1_quantity', '1');
    formData.append('currency_code', 'INR');
    formData.append('submit', 'Checkout');

    this.http.post('https://sandbox.2checkout.com/checkout/purchase', formData).subscribe(
      res=>{
        debugger
      }
    )
  }

}
