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

  constructor(
  	private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService
  	) { }

  ngOnInit() {
    this.loadModel();
  }

  loadModel(){
    this.model = new MyShippingModel();
  }

  openAddressModal(){
  	$('#addAddressModal').modal('show');
  }

  addAddress(){
    debugger;
    this.addressList.push(this.model);
    this.loadModel();
  }

}
