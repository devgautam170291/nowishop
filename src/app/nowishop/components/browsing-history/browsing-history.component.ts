import { Component, OnInit, Input } from '@angular/core';
import { NowishopService } from '../../../services/nowishop.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-browsing-history',
  templateUrl: './browsing-history.component.html',
  styleUrls: ['./browsing-history.component.css']
})
export class BrowsingHistoryComponent implements OnInit {

  @Input() userId:any;
  @Input() showTitle: any;
  @Input() productCount: any;
  @Input() itemInRow: any;

  constructor(
    private nowishopGlobal: NowishopService,
    private http: HttpClient, 
    private dataService: HttpService) { }

  browsingHistoryProducts: any = [];
  dummyProducts: any = [];
  model: any = {};

  ngOnInit() {
    this.loadModel();
    this.loadDummy();
  	this.getHistoryProducts();
  }

  loadModel(){
    debugger
    this.model.UserId = this.userId;
    this.model.PageSize = this.productCount;
    this.model.PageNumber = 1;
  }

  loadDummy(){
    for(let i=0; i<6; i++){
      this.dummyProducts.push({});
    }
  }

  getHistoryProducts(){
    this.http.post(this.dataService.baseUrl+'Home/UserBrowsingHistories', this.model).subscribe(
      res => {
        if(res['IsSuccess']){
          this.browsingHistoryProducts = res['Dt'];
        }
      }
    )  	
  }

}
