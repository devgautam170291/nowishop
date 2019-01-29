import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { SearchResultModel, SearchParams } from './search-result.model';
declare let $: any;

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

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
  categoryList: any = [];
  searchObj: any = [];

  ngOnInit() {
    this.laodModel();
  	this.showBreedcrumb();
    this.getCategoryList();  	
  	this.getSearchResult();
    this.loadDummyProducts();
  }

  laodModel(){
  	this.dataRequestModel = new SearchResultModel();
    this.dataRequestModel.SearchBar = this.route.snapshot.params.search_value;
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
    debugger
    if(e.currentTarget.checked){
      var searchObj = new SearchParams();
      searchObj.ColumnName = columnName;
      if(e.currentTarget.value.includes('|')){
        var operator = e.currentTarget.value.split('|')[0].trim().toLowerCase();
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
  	this.http.post(this.dataService.baseUrl + 'Home/SearchBarProductWithFilter', this.dataRequestModel).subscribe(
        res=>{
            this.productList = res['Dt'];
        }
    )
  }

}
