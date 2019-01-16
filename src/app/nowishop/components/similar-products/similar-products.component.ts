import { Component, OnInit, Input } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css']
})
export class SimilarProductsComponent implements OnInit {

  constructor() { }

  @Input() category;

  similarProducts: any = [];
  dummyProducts:any = [];

  ngOnInit() {
    this.loadDummy();
  	// this.getSimilarProducts();
  }

  loadDummy(){
    for(let i=0; i<4; i++){
      this.dummyProducts.push({});
    }
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
  	// $('.carousel').carousel({
   //    interval: 6000
   //  })
  }

}
