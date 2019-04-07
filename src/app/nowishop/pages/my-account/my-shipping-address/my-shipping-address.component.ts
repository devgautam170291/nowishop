import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../services/http.service';
import { NowishopService } from '../../../../services/nowishop.service';
import { Router } from '@angular/router';
import { MyShippingModel } from './my-shipping-model';
declare let $: any;

@Component({
  selector: 'app-my-shipping-address',
  templateUrl: './my-shipping-address.component.html',
  styleUrls: ['./my-shipping-address.component.css', '../my-account.component.css']
})
export class MyShippingAddressComponent implements OnInit {

  addressList: any = [];
  model: any;
  addressModel: any;

  constructor(
  	private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService
  	) { }

  userInfo: any;
  editIndex: any;

  ngOnInit() {
    this.loadModel();
    this.getUserInfo();
    this.getAddressList();
  }

  loadModel(){
    this.model = new MyShippingModel();
  }

  getUserInfo(){
    if(this.nowishopGlobal.isUserInfo()){
      this.userInfo = this.nowishopGlobal.getUserInfo();
    }
  }

  getAddressList(){
    this.http.get(this.dataService.baseUrl + 'UserAccount/GetUserShippingAddress/' + this.userInfo.userId).subscribe(
      res=>{
        this.addressList = res['Data'].map((data)=>{
          data.ShippingAddress = JSON.parse(data.ShippingAddress);
          return data;
        });
      }
    )
  }

  openAddressModal(){
  	$('#addAddressModal').modal('show');
  }

  closeAddressModal(){
    this.editIndex = 0;
    $('#addAddressModal').modal('hide');
  }

  addAddress(){
    debugger
    $('#addAddressModal').modal('hide');
    this.model.ShippingAddress = JSON.stringify(this.model.ShippingAddress);
    this.model.UserID = this.userInfo.userId;
    this.http.post(this.dataService.baseUrl + 'UserAccount/AddUserShippingAddress', this.model).subscribe(
      res=>{
        this.model.ShippingAddress = JSON.parse(this.model.ShippingAddress);
        if(this.editIndex || this.editIndex == 0){
          this.addressList.splice(this.editIndex, 1, this.model);
        }
        else {
          this.addressList.push(this.model);
        }        
        this.editIndex = 0;
        this.loadModel();
      }
    )
  }

  editAddress(shippingDetails, i){
    this.editIndex = i;
    this.model = shippingDetails;
    $('#addAddressModal').modal('show');
  }

  deleteAddress(index, shippingId){
    debugger
    this.http.get(this.dataService.baseUrl + 'UserAccount/deleteShippingAddress/' + shippingId).subscribe(
      res=>{
        if(res['IsSuccess']){
          this.addressList.splice(index, 1);
        }
      }
    )
  }

}
