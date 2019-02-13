import { Component, OnInit } from '@angular/core';
declare let $:any;

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css','../my-account.component.css']
})
export class MyOrdersComponent implements OnInit {

  constructor() { }
  fullStar: any = [];
  emptyStar: any = [];

  ngOnInit() {
  	this.loadDefault();
  }

  loadDefault(){
    debugger
    for(let i=0; i<5; i++){
      this.emptyStar.push(new Object());
    }
  }

  addReview(){
  	$('#review-modal').modal('show');
  }

}
