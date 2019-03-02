import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NowishopService } from '../../../services/nowishop.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(
  	private route: ActivatedRoute, 
  	private router: Router,
  	private nowishopGlobal: NowishopService,
  	private http: HttpClient, 
  	private dataService: HttpService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     }
  }

  breedcrumb: any;
  content: any = "";
  

  ngOnInit() {  	
    
  	this.checkParams();
    this.showBreedcrumb();
  }

  

  checkParams(){
    var val = this.route.snapshot.params.name;
    if(val){
      this.content = val;
    }
    else {
      this.router.navigate(['/account/my-nowishop']);
    }
  }

  showBreedcrumb(){
  	this.breedcrumb = [
      {
        "name": "Home",
        "url": "/",
        "active": false
      },
      {
        "name": "My Account",
        "url": "/account",
        "active": false
      },
      {
        "name": this.content.includes('-') ? this.content.split('-').join(' ') : this.content,
        "url": "#",
        "active": true
      }
    ];
  }

  changeContent(val){
  	this.content = val;
    switch (val) {
      case "my-nowishop":
         this.router.navigate(['/account/my-nowishop']);
        break;
      case "my-orders":
         this.router.navigate(['/account/my-orders']);
        break;
      case "my-wishlist":
         this.router.navigate(['/account/my-wishlist']);
        break;
      case "nowishop-points":
         this.router.navigate(['/account/nowishop-points']);
        break;
      case "notifications":
         this.router.navigate(['/account/notifications']);
        break;
      case "personal-information":
         this.router.navigate(['/account/personal-information']);
        break; 
      case "shipping-address":
         this.router.navigate(['/account/shipping-address']);
        break;
      case "security-setting":
         this.router.navigate(['/account/security-setting']);
        break; 
      case "account-binding":
         this.router.navigate(['/account/account-binding']);
        break;  
      case "browsing-history":
         this.router.navigate(['/account/browsing-history']);
        break;
      case "logout":
         this.logout();
        break;       
      default:
        this.router.navigate(['/help-center']);
        break;
    }
  }

  logout(){
  	if(this.nowishopGlobal.isUserInfo()){
      var userInfo = this.nowishopGlobal.getUserInfo();
      var model = {
        "UserId": userInfo['userId']
      }
      // this.laoding = true;
      this.dataService.post('User/Logout', model).subscribe(
        res => {
          if(res['IsSuccess']){
            this.nowishopGlobal.deleteUserInfo();
            this.router.navigate(['/']);
          }
        }
      )
  	}
  }
}
