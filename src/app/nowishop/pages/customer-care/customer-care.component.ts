import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-care',
  templateUrl: './customer-care.component.html',
  styleUrls: ['./customer-care.component.css']
})
export class CustomerCareComponent implements OnInit {

  constructor() { }
  breedcrumb: any;

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
        "name": "Customer Care",
        "url": "#",
        "active": true
      }
    ];
  }

}
