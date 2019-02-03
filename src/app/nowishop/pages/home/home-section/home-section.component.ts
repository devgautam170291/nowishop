import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../services/http.service';
import { NowishopService } from '../../../../services/nowishop.service';
import { HomeSectionDealModel } from './home-section-model';

@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.css']
})
export class HomeSectionComponent implements OnInit {

  @Input() type;
  @Input() titleBg;
  
  constructor(
    private http: HttpClient, 
    private dataService: HttpService, 
    private nowishopGlobal: NowishopService ) { }

  dataRequestModel: any;
  productList: any = [];
  dynamicTitle: any;
  flashDealTimerObj: any = {};
  productTagList: any = [];
  dummyProducts: any = [];

  ngOnInit() {
    this.loadModel();
    this.getAllProductTags();
    if(this.type == 'flashDeals'){
      this.flashDealTimer();
    }    
    this.loadDummyProducts();
  }

  loadModel(){
    this.dataRequestModel = new HomeSectionDealModel();
    this.flashDealTimerObj = {
      "hours": 0,
      "minutes": 0,
      "seconds": 0
    }
    this.dynamicTitleHandler();
  }

  loadDummyProducts(){
    for(let i=0; i<6; i++){
      this.dummyProducts.push({"dummy": true});
    }
  }

  getAllProductTags(){
    this.http.get(this.dataService.baseUrl + 'Deal/GetAllDeal').subscribe(
      res => {
        if(res['IsSuccess']){
          this.productTagList = res['Data'];
          this.dynamicContentHandler();
        }
      }
    )
  }

  flashDealTimer(){
    this.http.get(this.dataService.baseUrl + 'Home/CheckDealTime/flash_deal').subscribe(
      res=>{
        if(res['IsSuccess']){
          if(res['Data']){
            var data = res['Data'];
            this.showTimer(data['startTime'], data['EndTime']);
          }
          else{
            this.type = "recommended";
            this.dynamicTitleHandler();
            this.dynamicContentHandler();
          }          
        }
      }
    )    
  }

  dynamicTitleHandler(){
    if(this.type){
      if(this.type.toLowerCase() == 'flashdeals'){
        this.dynamicTitle = "Flash Deal";
      }
      else if(this.type.toLowerCase() == 'newarrivals'){
        this.dynamicTitle = "New Arrivals";
      }
      else if(this.type.toLowerCase() == 'bestselling'){
        this.dynamicTitle = "Best Selling";
      }
      else if(this.type.toLowerCase() == 'recommended'){
        this.dynamicTitle = "Recommend For You";
      }
    }
  }

  dynamicContentHandler(){
    if(this.type){
      if(this.type.toLowerCase() == 'flashdeals'){
        this.getProductList('flash');
      }
      else if(this.type.toLowerCase() == 'newarrivals'){
        this.getProductList('arrival');
      }
      else if(this.type.toLowerCase() == 'bestselling'){
        this.getProductList('best');
      }
      else if(this.type.toLowerCase() == 'recommended'){
        this.getProductList('recommended');
      }
    }
  }

  getProductList(type){
    if(this.productTagList && this.productTagList.length > 0){
      this.productTagList.forEach((productTag)=>{
        if(productTag['DealSlug'].includes(type)){
          this.dataRequestModel['DealSlug'] = productTag['DealSlug'];
        }        
      })

      if(this.dataRequestModel['DealSlug']){
        this.http.post(this.dataService.baseUrl + 'Home/DealWiseProductList', this.dataRequestModel).subscribe(
            res=>{
              this.productList = res['Dt'];
            }
          )
      }
    }  	
  }

  showTimer(startTime, endTime){
    var thisobj = this;
    var interval = setInterval(function(){
      var output = thisobj.nowishopGlobal.showTimer(new Date(), new Date(endTime));

      thisobj.flashDealTimerObj['hours'] = output['hours'] + (24 * output['days']);
      thisobj.flashDealTimerObj['minutes'] = output['minutes'];
      thisobj.flashDealTimerObj['seconds'] = output['seconds'];

      if(output.diff < 0){
        clearInterval(interval);
      }
    }, 1000);
    
  }

}
