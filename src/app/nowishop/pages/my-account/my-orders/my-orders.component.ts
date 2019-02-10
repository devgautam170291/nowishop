import { Component, OnInit } from '@angular/core';
declare let $:any;

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css','../my-account.component.css']
})
export class MyOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addReview(){
  	$('#review-modal').modal('show');
  }

}
