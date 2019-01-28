import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { SingleDealModel } from './single-deal-model';
declare let $: any;

@Component({
  selector: 'app-single-deal',
  templateUrl: './single-deal.component.html',
  styleUrls: ['./single-deal.component.css']
})
export class SingleDealComponent implements OnInit {

  constructor(private http: HttpClient, private dataService: HttpService, 
    private route: ActivatedRoute,
    private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     }
  }
  breedcrumb: any;
  dataRequestModel: any;
  productList: any = [];
  dummyProducts: any = [];

  ngOnInit() {
    this.laodModel();
  	this.showBreedcrumb();  	
  	this.getCategoryInfo();
    this.loadDummyProducts();
  }

  laodModel(){
  	this.dataRequestModel = new SingleDealModel();
    this.dataRequestModel.DealSlug = this.route.snapshot.params.deal_slug;
  }

  loadDummyProducts(){
    for(let i=0; i<18; i++){
      this.dummyProducts.push({"dummy": true});
    }
  }

  showBreedcrumb(){
    this.breedcrumb = [
      {
        "name": "Home",
        "url": "/",
        "active": false
      },
      {
        "name": this.dataRequestModel.DealSlug ? this.dataRequestModel.DealSlug.split('_').join(' ') : 'Loading...',
        "url": "#",
        "active": true
      }
    ];
  }

  getCategoryInfo(){
    this.dataRequestModel.PageSize = 30;
  	this.http.post(this.dataService.baseUrl + 'Home/DealWiseProductList', this.dataRequestModel).subscribe(
        res=>{
            this.productList = res['Dt'];
        }
    )
  }

}