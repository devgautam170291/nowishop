import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { SimilarProductModel } from './Similar-product-model';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css']
})
export class SimilarProductsComponent implements OnInit {

  constructor(private http: HttpClient, private dataService: HttpService) { }

  @Input() category;

  similarProducts: any = [];
  dataRequestModel: any;
  dummyProducts:any = [];

  ngOnInit() {
    this.loadDummy();
    this.dataRequestModel = new SimilarProductModel();
    if(this.category){
      this.getSimilarProducts();
    }
  }

  loadDummy(){
    for(let i=0; i<4; i++){
      this.dummyProducts.push({});
    }
  }

  getSimilarProducts(){
  	
    this.dataRequestModel.CategorySlug = this.category;
    this.http.post(this.dataService.baseUrl + 'Home/SimilarProduct', this.dataRequestModel).subscribe(
        res=>{
          if(res['IsSuccess']){
            this.similarProducts = res['Dt'];
          }
        }
      )
  }

  ngAfterViewChecked(){
  	// $('.carousel').carousel({
   //    interval: 6000
   //  })
  }

}
