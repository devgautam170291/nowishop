import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { showCategoriesModel } from './show-categories-model';

@Component({
  selector: 'app-show-categories',
  templateUrl: './show-categories.component.html',
  styleUrls: ['./show-categories.component.css']
})
export class ShowCategoriesComponent implements OnInit {

  constructor(private http: HttpClient, private dataService: HttpService) { }
  categoriesData: any = [];
  dummyCategoriesData: any = [];
  showCategoriesModel: any;
  loading: any = false;

  ngOnInit() {
    this.loadModel();
    this.loadDummyCategories();
    this.getCategories();
  }

  loadModel(){
    this.showCategoriesModel = new showCategoriesModel();
  }

  loadDummyCategories(){
    for(let i=0; i<3; i++){
      this.dummyCategoriesData.push({});
    }
  }

  getCategories(){
  	this.loading = true;
    this.http.post(this.dataService.baseUrl + 'Home/RecommendedCategoryList', this.showCategoriesModel).subscribe(
        res=>{
          this.loading = false;
          if(res['IsSuccess']){
            this.categoriesData = res['Dt'];
          }
        }
      )
  }

}
