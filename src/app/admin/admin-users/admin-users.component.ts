import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { NowishopService } from '../../services/nowishop.service';
import { AdminSearchComponent } from './../admin-search/admin-search.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./../admin.component.css']
})
export class AdminUsersComponent implements OnInit {
  @ViewChild(AdminSearchComponent) search: AdminSearchComponent;
  
  constructor(
    private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService
    ) { }
  breedcrumb: any = [];
  searchColumns: any;
  loading: any;
  model: any = [];

  ngOnInit() {
  	this.showBreedcrumb();
    this.setSearchColumns();  	
  }

  showBreedcrumb(){
    this.breedcrumb = [
      {
        "name": "Admin",
        "url": "/admin",
        "active": false
      },
      {
        "name": "Users",
        "url": "#",
        "active": true
      }
    ];
  }

  setSearchColumns(){
    this.searchColumns = [
      {name: 'User Name', value: 'UserName'}
    ];
  }

  getFilterResult(data){
  	this.model = data;
  }

  refreshUserList(){
    this.search.resetSearchFilter();
  }

  changeUserStatus(id){
    this.loading = true;
    var loggedInUserId = this.nowishopGlobal.getUserInfo().userId;

    this.http.get(this.dataService.baseUrl + 'User/ActiveInActiveUser/'+id+'/'+ loggedInUserId).subscribe(
        res => {
          this.loading = false;
          this.refreshUserList();
        }
      )
  }

  changePageNumber(pageNumber){
    this.search.checkPaginationValue(pageNumber);
  }

}