import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { NowishopService } from '../../../services/nowishop.service';
import { AddNewCategoryModel } from './add-new-category-model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./../../admin.component.css']
})
export class AddNewCategoryComponent implements OnInit {
  
  model: any;
  case: any;
  breedcrumb: any = [];
  catList: any = [];
  loading: any = false;

  constructor(
    private http: HttpClient, 
    private dataService: HttpService, 
    private route: ActivatedRoute,
    private nowishopGlobal: NowishopService) { }

  ngOnInit() {
    this.getAllCategories();
    this.loadModel();
    this.checkCase();
    this.showBreedcrumb();
  }

  loadModel(){
    debugger
    this.model = new AddNewCategoryModel();
  }

  checkCase(){     
    if(this.route.snapshot.params.id){
      this.case = 'edit';
      this.getCategoryData(this.route.snapshot.params.id);
    }
    else{
      this.case = 'add';
    }
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
        "url": "/admin/categories",
        "active": false
      },
      {
        "name": this.case == "add" ? "Add New Category" : "Edit Category" ,
        "url": "#",
        "active": true
      }
    ];
  }

  getAllCategories(){
    this.dataService.get('Category/GetCategoryList').subscribe(
        res => {
          if(res['IsSuccess']){
            this.catList = res['Data'];
          }
        }
      )
  }

  getCategoryData(id){    
    this.loading = true;
    this.dataService.get('/Category/getCategory/'+id).subscribe(
      res => {
        this.loading = false;
        if(res['IsSuccess']){
          this.model = res['Data'];
        }
        else {
          Swal("OOPS!", "Something went wrong.", "warning");
        }
      }
    )
  }

  uploadCatImg(e){
    if(e.currentTarget.files.length){
      var formData = new FormData();
      formData.append('UploadedImage', e.target.files[0]);
      this.loading = true;
      this.dataService.post('Product/SaveImage', formData).subscribe(
        res => {
          this.loading = false;
          if(res['IsSuccess']){
            this.model['CategoryImageUrl'] = this.dataService.imageUrl + res['Data'];
          }
        }
      )
    }
  }

  makeRecommendedCategory(event){
    if( event.target.checked ) {
      this.model['IsRecommended'] = true;
    }
  }

  addEditCategory(){
  	if(this.model.CategoryName){

      // Update model
      delete this.model['CategorySlug'];         

  		if(this.case == "add"){
        this.model['CreatedDate'] = new Date();
        this.model['CreatedBy'] = this.nowishopGlobal.getUserInfo().userId; 
        this.loading = true;
  			this.dataService.post('Category/AddCategory', this.model).subscribe(
	  			res => {
            this.loading = false;
            if(res['IsSuccess']){
              Swal("Success!", "Product successfully uploaded", "success");
            }
            else {
              Swal("OOPS!", "Something went wrong.", "warning");
            }
	  			}
	  		)
  		}

  		else {
        this.model['ModifiedDate'] = new Date(); 
        this.model['ModifiedBy'] = this.nowishopGlobal.getUserInfo().userId;
        this.loading = true;
  			this.dataService.post('Category/EditCategory', this.model).subscribe(
	  			res => {
            this.loading = false;
            if(res['IsSuccess']){
              Swal("Success!", "Product successfully uploaded", "success");
            }
	  				else {
              Swal("OOPS!", "Something went wrong.", "warning");
            }
	  			}
	  		)
  		}  		
  	}
  }

}
