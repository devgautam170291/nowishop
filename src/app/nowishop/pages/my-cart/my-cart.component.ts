import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { NowishopService } from '../../../services/nowishop.service';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  constructor(
    @Inject(WINDOW) private window: Window, 
    private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService
  ) { }
  breedcrumb: any;
  loading: any = false;
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
    this.loading = true;
    this.http.get(this.dataService.baseUrl + 'UserAccount/GetUserCardList/' + userId).subscribe(
      res=>{
        this.cartList = res['Data'];
        this.loading = false;
        this.nowishopGlobal.setInLocalStorage('user-cart', this.cartList);
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

    this.loading = true;
    this.http.post(this.dataService.baseUrl + 'UserAccount/RemoveUserCard',model).subscribe(
      res => {
        this.loading = false;
        if(res['IsSuccess']){
          this.cartList.splice(i, 1);
          this.nowishopGlobal.setInLocalStorage('user-cart', this.cartList);
        }
      }
    )
  }

  clearCart(){
    var userId = this.nowishopGlobal.getUserInfo().userId;
    this.loading = true;
    this.http.get(this.dataService.baseUrl + 'UserAccount/RemoveAllformUserCard/'+userId).subscribe(
      res=>{
        this.loading = false;
        if(res['IsSuccess']){
          this.cartList = [];
          this.nowishopGlobal.setInLocalStorage('user-cart', this.cartList);
          $(".alert").css("display", "block");
            this.window.setTimeout(function() {
                $(".alert").fadeTo(500, 0).slideUp(500, function(){
                    $(this).css("display", "none");
                });
            }, 2000);
        }
      }
    )
  }

}
