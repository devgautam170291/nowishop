import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { SearchResultModel, SearchParams } from './product-listing-model';
declare let $: any;

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

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
  showDummy: any = true;
  categoryList: any = [];
  searchObj: any = [];
  brandList: any = [];
  calledFrom: any;
  title: any;

  ngOnInit() {
    this.laodModel();
  	this.showBreedcrumb();
    this.getCategoryList();  	
  	this.getSearchResult();
    this.loadDummyProducts();
    this.getBrandList();
  }

  laodModel(){
    this.dataRequestModel = new SearchResultModel();

    var url = this.router.url;
    if(url.includes('category')){
      this.calledFrom = "category";
      this.title = this.route.snapshot.params.cat_slug;
      this.dataRequestModel.CategorySlug = this.route.snapshot.params.cat_slug;
    }
    else if(url.includes('deal')){
      this.calledFrom = "deal";
      this.title = this.route.snapshot.params.deal_slug;
      this.dataRequestModel.DealSlug = this.route.snapshot.params.deal_slug;
    }
    else if(url.includes('search')){
      this.calledFrom = "search";
      this.title = this.route.snapshot.params.search_value;
      this.dataRequestModel.SearchBar = this.route.snapshot.params.search_value;
    } 	    
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
        "name": this.dataRequestModel.SearchBar ? this.dataRequestModel.SearchBar.split('_').join(' ') : 'Loading...',
        "url": "#",
        "active": true
      }
    ];
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

  handleSearchParams(columnName, e){
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
    this.getSearchResult();
  }

  getSearchResult(){
    this.dataRequestModel.PageSize = 30;
    this.dataRequestModel.Search = this.searchObj;
    var url = "";
    switch (this.calledFrom) {
      case "category":
        url = "Home/CategoryWiseProductList";
        break;
      case "deal":
        url = "Home/DealWiseProductList";
        break;
      case "search":
        url = "Home/SearchBarProductWithFilter";
        break;
          
      default:
        // code...
        break;
    }
  	this.http.post(this.dataService.baseUrl + url, this.dataRequestModel).subscribe(
        res=>{
            this.productList = res['Dt'];
            this.showDummy = false;
        }
    )
  }

}
