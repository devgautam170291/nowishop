import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminSearchModal, PaginationModal } from './admin-search.modal';
import { HttpClient } from '@angular/common/http'; 
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./../admin.component.css']
})
export class AdminSearchComponent implements OnInit {

  constructor(private http: HttpClient, private dataService: HttpService) { }
  @Output() filterResult = new EventEmitter();
  @Input() calledFrom;
  @Input() searchColumns;

  filterJson: any = [];
  loading: any;
  searchParameter: any;
  totalRecords: any;

  ngOnInit() {
    this.searchParameter = new PaginationModal();
  	this.filterJson.push(new AdminSearchModal());
    this.searchFilter();
  }

  addSearchFilter(){
  	this.filterJson.push(new AdminSearchModal());
  }

  removeSearchFilter(index){
  	this.filterJson.splice(index, 1);
  }

  resetSearchFilter(){
  	this.filterJson = [];
  	this.filterJson.push(new AdminSearchModal());
    this.searchFilter();
  }

  searchFilter(){
    debugger
    var url = '';
    switch (this.calledFrom) {
      case "category":
        url = 'Category/SearchCategoryList';
        break;

      case "product":
        url = "Product/SearchProductList";
        break;

      case "user":
        url = "User/SearchUserList";
        break;

      case "brand":
        url = "Category/SearchBrandList";
        break;

      case "producttags":
        url = "Deal/SearchDealsList";
        break;

      case "notification":
        url = "Product/SearchNotificationList";
        break;  
      
      default:
        // code...
        this.loading = false;
        break;
    }

    this.searchParameter['Search'] = this.filterJson;
    this.loading = true;
    this.dataService.post( url, this.searchParameter).subscribe(
      res => {
        debugger
        this.loading = false;
        if(res['IsSuccess']){
          this.totalRecords = res['TotalRecords'];
          this.filterResult.emit(res['Dt']);
        }
      }
    )
  }

  checkPaginationValue(pageNumber){
    debugger
    if(pageNumber){
      this.searchParameter.PageNumber = pageNumber;
      this.searchFilter();
    }
  }

}
