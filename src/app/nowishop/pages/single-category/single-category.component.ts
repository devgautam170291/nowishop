import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { SingleCategoryModel } from './single-category-model';
declare let $: any;

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {

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
  	this.dataRequestModel = new SingleCategoryModel();
    this.dataRequestModel.CategorySlug = this.route.snapshot.params.cat_slug;
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
        "name": this.dataRequestModel.CategorySlug ? this.dataRequestModel.CategorySlug.split('_').join(' ') : 'Loading...',
        "url": "#",
        "active": true
      }
    ];
  }

  getCategoryInfo(){
    this.dataRequestModel.PageSize = 30;
  	this.http.post(this.dataService.baseUrl + 'Home/SimilarProduct', this.dataRequestModel).subscribe(
        res=>{
            this.productList = res['Dt'];
        }
    )
  }

}
