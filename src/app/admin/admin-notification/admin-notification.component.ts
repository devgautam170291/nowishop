import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { AdminSearchComponent } from './../admin-search/admin-search.component';
import swal from 'sweetalert2';
declare let $: any;

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./../admin.component.css']
})
export class AdminNotificationComponent implements OnInit {

  @ViewChild(AdminSearchComponent) search: AdminSearchComponent;
  
  constructor(private http: HttpClient, private dataService: HttpService) { }
  breedcrumb: any = [];
  loading: any;
  searchColumns: any;
  model: any = [];

  ngOnInit() {
  	this.showBreedcrumb();
    this.setSearchColumns();
  }

  setSearchColumns(){
    this.searchColumns = [
      {name: 'Brand Name', value: 'BrandName'},
      {name: 'SKU', value: 'SkuDetails'}
    ];
  }

  showBreedcrumb(){
    this.breedcrumb = [
      {
        "name": "Admin",
        "url": "/admin",
        "active": false
      },
      {
        "name": "Notifications",
        "url": "#",
        "active": true
      }
    ];
  }

  getFilterResult(data){
    this.model = data;
  }

}
