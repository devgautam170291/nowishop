import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.css']
})
export class HelpCenterComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     }
  }
  breedcrumb: any;
  content: any;

  ngOnInit() {
  	this.showBreedcrumb();
    this.checkParams();
  }

  checkParams(){
    var val = this.route.snapshot.params.name;
    if(val){
      this.content = val;
    }
    else {
      this.content = 'payment-policy';
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
        "name": "Help Center",
        "url": "#",
        "active": true
      }
    ];
  }

  changeContent(val){
  	this.content = val;
    switch (val) {
      case "payment-policy":
         this.router.navigate(['/help-center/payment-policy']);
        break;
      case "privacy-policy":
         this.router.navigate(['/help-center/privacy-policy']);
        break;
      case "shipping":
         this.router.navigate(['/help-center/shipping']);
        break;
      case "return-policy":
         this.router.navigate(['/help-center/return-policy']);
        break;
      case "loyalty-program":
         this.router.navigate(['/help-center/loyalty-program']);
        break;      
      default:
        this.router.navigate(['/help-center']);
        break;
    }
  }
}
