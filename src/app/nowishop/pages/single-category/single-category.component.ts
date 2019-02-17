import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { SingleCategoryModel, SearchParams } from './single-category-model';
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
  showDummy: any = true;
  dummyProducts: any = [];
  categoryList: any = [];
  searchObj: any = [];
  brandList: any = [];

  ngOnInit() {
    this.laodModel();
  	this.showBreedcrumb();  
    this.getCategoryList();	
  	this.getCategoryInfo();
    this.loadDummyProducts();
    this.getBrandList();
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

  getBrandList(){
    this.http.get(this.dataService.baseUrl + 'Brand/GetAllBrand').subscribe(
      res=>{
        debugger
        this.brandList = res['Data'];
      }
    )
  }

  getCategoryList(){
    this.http.get(this.dataService.baseUrl + 'Home/HomeCategory').subscribe(
        res => {
          if(res['IsSuccess']){
            this.categoryList = res['Data'];
          }
        }
      )
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

  handleSearchParams(columnName, e){
    debugger
    if(e.currentTarget.checked){
      var searchObj = new SearchParams();
      searchObj.ColumnName = columnName;
      if(e.currentTarget.value.includes('|')){
        var operator = e.currentTarget.value.split('|')[0].trim().toLowerCase();
        searchObj.ColumnValue = e.currentTarget.value.split('|')[1];
        switch (operator) {
          case "less":
             searchObj.Operator = 8;
            break;
          case "between":
             searchObj.Operator = 6;
            break;
          case "above":
             searchObj.Operator = 7;
            break;
         
          default:
            searchObj.Operator = 5;
            break;
        }
      }
      else {
        searchObj.Operator = 1;
        searchObj.ColumnValue = e.currentTarget.value;
      }

      if(columnName.toLowerCase() == 'price'){
        this.searchObj.forEach((data,i)=>{
          if(data.ColumnName.toLowerCase() == 'price'){
            this.searchObj.splice(i, 1);
          }
        })
      }

      this.searchObj.push(searchObj);
    }
    else{
      var val = e.currentTarget.value;
      if(this.searchObj.length){
        this.searchObj.forEach((data, i)=>{
          if(data.ColumnValue.toLowerCase() == val.toLowerCase()){
            this.searchObj.splice(i, 1);
          }
        })
      }
    }
    this.getCategoryInfo();
  }

  getCategoryInfo(){
    this.dataRequestModel.PageSize = 30;
    this.dataRequestModel.Search = this.searchObj;
  	this.http.post(this.dataService.baseUrl + 'Home/CategoryWiseProductList', this.dataRequestModel).subscribe(
        res=>{
            this.productList = res['Dt'];
            this.showDummy = false;
        }
    )
  }

}
