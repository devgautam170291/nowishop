import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../services/http.service';
import { NowishopService } from '../../../../services/nowishop.service';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-my-shipping-address',
  templateUrl: './my-shipping-address.component.html',
  styleUrls: ['./my-shipping-address.component.css', '../my-account.component.css']
})
export class MyShippingAddressComponent implements OnInit {

  constructor(
  	private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService
  	) { }

  ngOnInit() {
  }

  addAddress(){
  	$('#addAddressModal').modal('show');
  }

}
