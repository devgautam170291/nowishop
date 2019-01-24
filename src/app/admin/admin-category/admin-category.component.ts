import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { AdminSearchComponent } from './../admin-search/admin-search.component';
import swal from 'sweetalert2';
declare let $:any;

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./../admin.component.css']
})
export class AdminCategoryComponent implements OnInit {

  @ViewChild(AdminSearchComponent) search: AdminSearchComponent;

  constructor(private http: HttpClient, private dataService: HttpService) { }
  model: any;
  case: any;
  catData: any;
  breedcrumb: any;
  showModel: boolean;
  loading: boolean;
  searchColumns: any;

  ngOnInit() {
  	this.model = [];
    this.setSearchColumns();
    this.showBreedcrumb();
  }

  setSearchColumns(){
    this.searchColumns = [
      {name: 'Category Name', value: 'CategoryName'},
      {name: 'Parent Category Name', value: 'ParentCategoryName'}
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
        "name": "Categories",
        "url": "#",
        "active": true
      }
    ];
  }

  getFilterResult(data){
  	this.model = data;
  }

  changeCatstatus(catId){
    this.loading = true;
    this.dataService.get('Category/DecativeCategory?id='+catId).subscribe(
      res => {
        this.loading = false;
        if(res['IsSuccess']){
          this.refreshCategory();
        }
      }
    )
  }

  deleteCategory(catId){
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
        this.dataService.get('Category/DeleteCategory/'+catId).subscribe(
            res=>{
              this.loading = false;
              if(res['IsSuccess']){
                swal(
                  'Deleted!',
                  'Category has been deleted.',
                  'success'
                )
                this.refreshCategory();
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

  refreshCategory(){
    this.search.resetSearchFilter();
  }

  changePageNumber(pageNumber){
    this.search.checkPaginationValue(pageNumber);
  }

}
