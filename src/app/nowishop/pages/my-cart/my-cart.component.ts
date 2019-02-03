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
  // quantity: any = 1;
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
        this.cartList = res['Data'];
      }
    )
  }

  increaseQuantity(obj){
    obj.ProductCount += 1;
  }

  decreaseQuantity(obj){
    if(obj.ProductCount > 1){
      obj.ProductCount -= 1;
    }
  }

  removeFromCart(i){
    debugger
    var model = {
      "UserID": this.cartList[i].UserID,
      "ProductID":this.cartList[i].ProductID,
      "ProductVariactionID":this.cartList[i].ProductVariationID,  
      "ProductSizeID":this.cartList[i].ProductSizeID,
    };

    this.http.post(this.dataService.baseUrl + 'UserAccount/RemoveUserCard',model).subscribe(
      res => {
        if(res['IsSuccess']){
          this.cartList.splice(i, 1);
        }
      }
    )
  }

  clearCart(){
    var userId = this.nowishopGlobal.getUserInfo().userId;
    this.http.get(this.dataService.baseUrl + 'UserAccount/RemoveAllformUserCard/'+userId).subscribe(
      res=>{
        if(res['IsSuccess']){
          alert('cart is clear');
        }
      }
    )
    this.cartList = [];
  }

}
