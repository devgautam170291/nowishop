import { Component, OnInit } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css']
})
export class SimilarProductsComponent implements OnInit {

  constructor() { }

  similarProducts: any = [];

  ngOnInit() {
  	this.getSimilarProducts();
  }

  getSimilarProducts(){
  	this.similarProducts = [
  		{
  			name: 'Ban Bao Bags',
  			image: '',
  			price: '15.20',
  			rating: '',
  			link: ''
  		},
  		{
  			name: 'Ban Bao Bags',
  			image: '',
  			price: '15.20',
  			rating: '',
  			link: ''
  		},
  		{
  			name: 'Ban Bao Bags',
  			image: '',
  			price: '15.20',
  			rating: '',
  			link: ''
  		},
  		{
  			name: 'Ban Bao Bags',
  			image: '',
  			price: '15.20',
  			rating: '',
  			link: ''
  		}
  	];
  }

  ngAfterViewChecked(){
  	$('.carousel').carousel({
      interval: 6000
    })
  }

}
