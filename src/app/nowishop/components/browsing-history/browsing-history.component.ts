import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browsing-history',
  templateUrl: './browsing-history.component.html',
  styleUrls: ['./browsing-history.component.css']
})
export class BrowsingHistoryComponent implements OnInit {

  constructor() { }

  browsingHistoryProducts: any = [];
  dummyProducts: any = [];

  ngOnInit() {
    this.loadDummy();
  	// this.getHistoryProducts();
  }

  loadDummy(){
    for(let i=0; i<6; i++){
      this.dummyProducts.push({});
    }
  }

  getHistoryProducts(){
  	this.browsingHistoryProducts = [
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

}
