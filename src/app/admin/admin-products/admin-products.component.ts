import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { AdminSearchComponent } from './../admin-search/admin-search.component';
import swal from 'sweetalert2';
declare let $: any;

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./../admin.component.css']
})
export class AdminProductsComponent implements OnInit {
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
      {name: 'Product Name', value: 'ProductName'},
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
        "url": "#",
        "active": true
      }
    ];
  }

  changeProductStatus(id){
    this.loading = true;
    this.dataService.get('Product/ActiveInactiveProduct/'+id).subscribe(
        res => {
          this.loading = false;
          this.refreshProductList();
        }
      )
  }

  refreshProductList(){
    this.search.resetSearchFilter();
  }

  getFilterResult(data){
    this.model = data;
  }

  changePageNumber(pageNumber){
    this.search.checkPaginationValue(pageNumber);
  }

  deleteProduct(id){
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
        this.dataService.get('Product/DeleteProduct/'+id).subscribe(
            res=>{
              this.loading = false;
              if(res['IsSuccess']){
                swal(
                  'Deleted!',
                  'Product has been deleted.',
                  'success'
                )
                this.refreshProductList();
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
