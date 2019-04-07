import { Component, OnInit, Inject } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { NowishopService } from '../../../services/nowishop.service';
import { Router } from '@angular/router';
import { MyShippingModel, PaymentModel, PaymentInfoModel } from './shipping-payment-model';
declare let $: any;
declare let TCO: any;

@Component({
  selector: 'app-shipping-payment',
  templateUrl: './shipping-payment.component.html',
  styleUrls: ['./shipping-payment.component.css', '../my-cart/my-cart.component.css']
})
export class ShippingPaymentComponent implements OnInit {

  constructor(
    @Inject(WINDOW) private window: Window,
    private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService) { }

  paymentProgress: any;
  breedcrumb: any;
  cartList: any = [];
  addressList: any = [];
  model: any;
  userInfo: any;
  paymentModel:any;
  savePaymentModel: any;
  selectedAddressId: any;
  totalPrice: any;

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
  			"active": true,
        "show": true
  		},
  		{
  			"name": "payment",
  			"active": false,
        "show": false
  		},
  		{
  			"name": "done",
  			"active": false,
        "show": false
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

  setShippingAddress(address){
    debugger
    this.selectedAddressId = address.ShippingAddressID;
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
        this.cartList = res['Data']['userCard'];
        this.totalPrice = res['Data']['TotalCost'];
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
    debugger
    this.paymentProgress = this.paymentProgress.map((data, i)=>{
          data.show = false;
          return data;
        });
        this.paymentProgress[1].show = true;
        this.paymentProgress[1].active = true;
  }

  submitPayment(){
    debugger
    var payWithCard = data => {
      debugger
      console.log(data.response.token.token);
      this.getTotalCost(data.response.token.token);
    }

    var error = data => {
      console.log(data);
    }

    TCO.loadPubKey("sandbox", ()=>{
      TCO.requestToken(payWithCard, error, this.paymentModel)
    })
  }

  getTotalCost(token){
    this.http.get(this.dataService.baseUrl + 'PaymentGateway/UserTotalCost/' + this.userInfo.userId).subscribe(
      res => {
        this.savePaymentModel = new PaymentInfoModel();
        this.savePaymentModel.TwoCheckOutToken = token;
        this.savePaymentModel.UserID = this.userInfo.userId;
        this.savePaymentModel.ShippingAddressID = this.selectedAddressId;

        this.savePaymentInfo(this.savePaymentModel);
      }
    ) 
  }

  savePaymentInfo(model){
    this.http.post(this.dataService.baseUrl + 'PaymentGateway/TwoCheckoutPayment', model).subscribe(
      res => {
        debugger
        // Thats it make it complete
      }
    )    
  }

}
