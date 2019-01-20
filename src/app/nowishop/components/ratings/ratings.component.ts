import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  constructor() { }

  @Input() rating;
  fullStar: any;
  halfStar: any;
  emptyStar: any;

  fullStarArray: any = [];
  halfStarArray: any = [];
  emptyStarArray: any = [];

  ngOnInit() {
  	this.getRatingStars();
  }

  getRatingStars(){
    this.rating = parseFloat(this.rating) ? parseFloat(this.rating) : 5;
  	this.rating = this.rating.toFixed(1);
  	this.fullStar = Math.floor(this.rating);
  	this.halfStar = (this.rating - this.fullStar) * 10;
  	this.emptyStar = 5 - (this.fullStar + (this.halfStar ? 1 : 0));
  	this.makeStarsArray('full');
  	this.makeStarsArray('half');
  	this.makeStarsArray('empty');
  }

  makeStarsArray(type){
  	if(type == 'full'){
  		for(let i=0; i<this.fullStar; i++){
  			this.fullStarArray.push('fullStar');
  		}
  	}
  	else if(type == 'half'){
  		if(this.halfStar != 0){
  			this.halfStarArray.push('halfStar');
  		}
  	}
  	else if(type == 'empty'){
  		for(let i=0; i<this.emptyStar; i++){
  			this.emptyStarArray.push('emptyStar');
  		}
  	}
  }

}
