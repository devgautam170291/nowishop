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

  refreshNotificationList(){
    this.search.resetSearchFilter();
  }

  deleteNotiication(id){
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.dataService.get('UserAccount/DeleteNotification/'+id).subscribe(
            res=>{
              this.loading = false;
              if(res['IsSuccess']){
                swal(
                  'Deleted!',
                  'Notification has been deleted.',
                  'success'
                )
                this.refreshNotificationList();
              }
              else {
                swal(
                  'OOPS...',
                  'Something went wrong!',
                  'error'
                )
              }
            }
          )
      }
    })
  }

}
