import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  constructor() { }
  breedcrumb: any;
  quantity: any = 1;

  ngOnInit() {
  	this.showBreedcrumb();
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

  increaseQuantity(){
    this.quantity += 1;
  }

  decreaseQuantity(){
    if(this.quantity > 1){
      this.quantity -= 1;
    }
  }

}
