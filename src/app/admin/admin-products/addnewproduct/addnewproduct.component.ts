import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddProductModal, ProductVariation, SizeQuantity, ImagePath } from "./addnewproduct-model";
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-addnewproduct',
  templateUrl: './addnewproduct.component.html',
  styleUrls: ['./../../admin.component.css']
})
export class AddnewproductComponent implements OnInit {
  constructor(private http: HttpClient, private dataService: HttpService, private route: ActivatedRoute) { }
  breedcrumb: any = [];
  model: any;
  categoriesList: any = [];
  loading: any;
  case: any;
  uploadImage: any = false;
  uploadImagesFiles: any;
  brandList: any = [];
  productTagList: any = [];
  moreProductInfo: any = [];
  productSearchKeys: any = []; 

  ngOnInit() {	
    this.loading = false;
  	this.model = new AddProductModal();
    this.checkCase();
    this.showBreedcrumb();
    this.getAllCategories();
    this.getAllBrands();
    this.getAllProductTags();
  }

  checkCase(){ 
    if(this.route.snapshot.params.id){
      this.case = 'edit';
      this.getEditProductData(this.route.snapshot.params.id);
    }
    else{
      this.case = 'add';
    }
  }

  getEditProductData(id){
    this.loading = true;
    this.dataService.get('Product/GetProduct/' + id).subscribe(
        res => {
          this.loading = false;
          if(res['IsSuccess']){
            this.model = res['Data'][0];
            this.moreProductInfo = JSON.parse(this.model.More_Data);
          }
        }
      )
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
        "name": (this.case == "add" ? "Add New" : "Edit") + " Product",
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
            this.categoriesList = res['Data'];
          }
        }
      )
  }

  getAllBrands(){
    this.loading = true;
    this.dataService.get('Brand/GetAllBrand').subscribe(
      res=>{
        this.loading = false;
        this.brandList = res['Data'];
      }
    )
  }

  getAllProductTags(){
    this.loading = true;
    this.dataService.get('Deal/GetAllDeal').subscribe(
      res => {
        this.loading = false;
        this.productTagList = res['Data'];
      }
    )
  }

  addSizeQuantity(variationIndex){
    var newSizeQuantity = new SizeQuantity();
    this.model.product_Variations[variationIndex].size_Quantities.push(newSizeQuantity);
  }

  removeSizeQuantity(variationIndex, sizeQuantityIndex){
    this.model.product_Variations[variationIndex].size_Quantities.splice(sizeQuantityIndex, 1);
    if(this.model.product_Variations[variationIndex].size_Quantities.length == 0){
      this.addSizeQuantity(variationIndex);
    }
  }

  addMoreVariation(){
    var newVariation = new ProductVariation();
    this.model.product_Variations.push(newVariation);
  }

  removeVariation(index){    
    this.model.product_Variations.splice(index, 1);
    if(this.model.product_Variations.length == 0){
      this.addMoreVariation();
    }
  }

  uploadImages(event, variation){
    if(event.target.files.length){
      var formData = new FormData();
      for(let i=0; i<event.target.files.length; i++){
        formData.append('UploadedImage', event.target.files[i]);
      }    
      this.dataService.post('Product/SaveImage', formData).subscribe(
        res => {
          if(res['IsSuccess']){
            var urls = res['Data'];
            if(urls.includes(',')){
              urls = urls.split(',');
              for(let i=0; i<urls.length; i++){
                var imgPath = new ImagePath();
                imgPath.url = this.dataService.imageUrl + urls[i];
                variation.uploadedImages.push(imgPath);
              }
            }
            else{
              var imgPath = new ImagePath();
              imgPath.url = this.dataService.imageUrl + urls;
              variation.uploadedImages.push(imgPath);
            }
          }
        }
      )
    }
  }

  setFeaturedImages(model){
    if(this.model.product_Variations.length){
      this.model.product_Variations.forEach((data)=>{
        if(data.uploadedImages.length){
          data.uploadedImages[0].IsFeatured_VariationImage = true;
        }
      })
    }
    return model;
  }

  uploadProduct(){
    this.model.More_Data = JSON.stringify(this.moreProductInfo);
    this.model = this.setFeaturedImages(this.model);
    if(this.productSearchKeys.length){
      this.model.ProductSearch = this.productSearchKeys.join('|');
    }
    this.loading = true;
    if(this.case == "add"){
      this.addEditProduct('Product/AddProduct',this.model);
    }
    else{
      this.addEditProduct('Product/EditProduct',this.model);
    }
  }

  addEditProduct(url, data){
    this.dataService.post(url, data).subscribe(
        res => {
          this.loading = false;
           if(res['IsSuccess']){
               Swal("Success!", "Product successfully uploaded", "success");
           }
           else {
             Swal("OOPS!", "Something went wrong", "error");
           }
        }
      )
  }

  imgMoveRight(index, arr){
    if(index != (arr.length - 1)){
      var temp = arr[index];
      arr[index] = arr[index + 1];
      arr[index + 1] = temp;      
    }
  }

  imgMoveLeft(index, arr){
    if(index != 0){
      var temp = arr[index];
      arr[index] = arr[index - 1];
      arr[index - 1] = temp; 
    }
  }

  deleteImage(index, obj){
    obj.splice(index, 1);
  }

  addMoreProductInfo(){
    var obj = {
      "key": "",
      "value": ""
    }

    this.moreProductInfo.push(obj);
  }

  removeProductInfo(index){
    this.moreProductInfo.splice(index, 1);
  }

  makeRecommendedProduct(event){
    if( event.target.checked ) {
      this.model['IsRecommended'] = true;
    }
  }

  addSearchKey(){
    if(this.model.ProductSearch){
      this.productSearchKeys.push(this.model.ProductSearch);
      this.model.ProductSearch = "";
    }
  }

  deleteSearchKey(index){
    this.productSearchKeys.splice(index, 1);
  }
}
