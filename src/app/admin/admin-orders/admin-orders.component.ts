import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./../admin.component.css']
})
export class AdminOrdersComponent implements OnInit {

  constructor() { }
  breedcrumb: any;
  searchColumns: any;
  model: any;

  ngOnInit() {
  	this.showBreedcrumb();
    this.setSearchColumns();  	
  }

  showBreedcrumb(){
    this.breedcrumb = [
      {
        "name": "Admin",
        "url": "/admin",
        "active": false
      },
      {
        "name": "Orders",
        "url": "#",
        "active": true
      }
    ];
  }

  setSearchColumns(){
    this.searchColumns = [
      {name: 'Order Name', value: 'orderName'}
    ];
  }

  getFilterResult(data){
    this.model = data;
  }

}
