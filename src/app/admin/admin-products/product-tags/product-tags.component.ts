import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { AdminSearchComponent } from './../../admin-search/admin-search.component';
import swal from 'sweetalert2';
declare let $: any;

@Component({
  selector: 'app-product-tags',
  templateUrl: './product-tags.component.html',
  styleUrls: ['./../../admin.component.css']
})
export class ProductTagsComponent implements OnInit {

  @ViewChild(AdminSearchComponent) search: AdminSearchComponent;

  breedcrumb: any = [];
  loading: any;
  searchColumns: any;
  model: any = [];

  constructor(private http: HttpClient, private dataService: HttpService) { }

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
        "name": "Products",
        "url": "/admin/products",
        "active": false
      },
      {
        "name": "Add Product Tag",
        "url": "#",
        "active": true
      }
    ];
  }

  changeProductTagStatus(id){
    this.loading = true;
    this.dataService.get('Deal/ActiveIncativeDeal?DealID='+id).subscribe(
      res => {
        this.loading = false;
        this.refreshProductTagList();
      }
    )
  }

  deleteProductTag(id){
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
        this.dataService.get('Deal/DeleteDeal/'+id).subscribe(
            res=>{
              this.loading = false;
              if(res['IsSuccess']){
                swal(
                  'Deleted!',
                  'Product Tag has been deleted.',
                  'success'
                )
                this.refreshProductTagList();
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

  refreshProductTagList(){
    this.search.resetSearchFilter();
  }

  getFilterResult(data){
    this.model = data;
  }

  changePageNumber(pageNumber){
    this.search.checkPaginationValue(pageNumber);
  }

}
