import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})

export class ShowProductComponent implements OnInit {

@Input() product;
  constructor() { 
  	if(!this.product){
  		this.product = {};
  	}
  }

  ngOnInit() {
  }

}
