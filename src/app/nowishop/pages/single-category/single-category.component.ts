import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private http: HttpClient, private dataService: HttpService, private route: ActivatedRoute) { }
  breedcrumb: any;
  dataRequestModel: any;
  productList: any = [];
  dummyProducts: any = [];

  ngOnInit() {
  	this.showBreedcrumb();
  	this.laodModel();
  	this.getCategoryInfo();
    this.loadDummyProducts();
  }

  laodModel(){
  	this.dataRequestModel = new SingleCategoryModel();
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
        "name": "Category",
        "url": "#",
        "active": true
      }
    ];
  }

  getCategoryInfo(){
  	this.dataRequestModel.DealSlug = this.route.snapshot.params.cat_slug;
  	this.http.post(this.dataService.baseUrl + 'Home/DealWiseProductList', this.dataRequestModel).subscribe(
        res=>{
            this.productList = res['Dt'];
        }
    )
  }

}
