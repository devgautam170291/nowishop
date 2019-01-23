import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { AddNewBrandModel } from './addnewbrand-model';
import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-addnewbrand',
  templateUrl: './addnewbrand.component.html',
  styleUrls: ['./../../admin.component.css']
})
export class AddnewbrandComponent implements OnInit {

  constructor(private http: HttpClient, private dataService: HttpService,private route: ActivatedRoute) { }
  breedcrumb: any = [];
  model: any;
  loading: any;
  case: any;
  showMultiselect: any = false;
  dropdownList: any = [];
  dropdownSettings: any;

  ngOnInit() {
    this.checkCase();
  	this.showBreedcrumb();
    this.model = new AddNewBrandModel();
    this.setMultiselectParameters();      
    this.getAllCategories();  
  }

  ngAfterViewChecked(){
    $('.multiselect-item-checkbox').css('font-size','15px');
    $('.multiselect-item-checkbox').css("font-family","'Open Sans', sans-serif");
    $('.dropdown-list').css("margin-bottom", '40px');
  }

  checkCase(){ 
    if(this.route.snapshot.params.id){
      this.case = 'edit';
      this.getEditBrandData(this.route.snapshot.params.id);
    }
    else{
      this.case = 'add';
    }
  }

  getEditBrandData(id){
    this.loading = true;
    this.dataService.get('Brand/GetBrand?BrandID=' + id).subscribe(
        res => {
          this.loading = false;
          if(res['IsSuccess']){
            this.model = res['Data'][0];
          }
        }
      )
  }

  setMultiselectParameters(){
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'CategoryID',
      textField: 'CategoryName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  showBreedcrumb(){
    this.breedcrumb = [
      {
        "name": "Admin",
        "url": "/admin",
        "active": false
      },
      {
        "name": "Brands",
        "url": "/admin/brands",
        "active": false
      },
      {
        "name": this.case == 'add' ? "Add New Brand" : "Edit Brand",
        "url": "#",
        "active": true
      }
    ];
  }

  getAllCategories(){
    this.loading = true;
    this.dataService.get('Category/GetCategoryList').subscribe(
        res => {
          this.loading = false;
          if(res['IsSuccess']){
            debugger 
            res['Data'].forEach((arr)=>{
              let obj = {
                "CategoryID": arr['CategoryId'],
                "CategoryName": arr['CategoryName']
              }
              this.dropdownList.push(obj);
            });

            this.showMultiselect = true;
          }
          else {
            this.dropdownList = [];
          }
        }
      )
  }

  onItemSelect(item: any) {
    this.model.brandCategories.push(item);
  }
  onSelectAll(items: any) {
    this.model.brandCategories = items;
  }
  onDeSelect(item: any){
    var id = item.CategoryID;
    this.model.brandCategories.forEach((data, index, arr)=>{
        if(data.CategoryID == id){
          arr.splice(index, 1);
        }
    })
  }
  onDeSelectAll(items: any){
    this.model.brandCategories = items;    
  }

  uploadBrand(){
    debugger
    if(this.model.BrandName){
      this.loading = true;
      var url = "";
      if(this.case == "add"){
        url = "Brand/AddBrand";
      }
      else{
        url = "";
      }
      this.dataService.post(url, this.model).subscribe(
        res=> {
          this.loading = false;
          if(res['IsSuccess']){
            Swal("Success!", "Brand successfully uploaded", "success");
          }
          else{
            Swal("OOPS!", "Something went wrong", "error");
          }
        }
      )
    }
  }

}
