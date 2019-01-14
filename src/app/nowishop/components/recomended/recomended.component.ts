import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { RecommendedModel } from './recomended-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomended',
  templateUrl: './recomended.component.html',
  styleUrls: ['./recomended.component.css']
})
export class RecomendedComponent implements OnInit {

  constructor(private http: HttpClient, private dataService: HttpService) { }
  recommendProducts: any = [];
  dataRequestModel: any;
  dummyRecommendProducts: any = [];

  ngOnInit() {  	
    this.loadModel();
    this.loadDummyData();
    this.getRecommendedProducts();
  }

  loadModel(){
    this.dataRequestModel = new RecommendedModel();
  }

  loadDummyData(){
    for(let i=0; i<4; i++){
      this.dummyRecommendProducts.push({"dummyData": true});
    }
  }

  getRecommendedProducts(){
    this.http.post(this.dataService.baseUrl + 'Home/RecommendedProductList', this.dataRequestModel).subscribe(
        res=>{
          if(res['IsSuccess']){
            this.recommendProducts = res['Dt'];
          }
        }
      )
  }

}
