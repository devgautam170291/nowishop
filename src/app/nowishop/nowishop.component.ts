import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './../services/http.service';
import { NowishopService } from './../services/nowishop.service';

@Component({
  selector: 'app-nowishop',
  templateUrl: './nowishop.component.html',
  styleUrls: ['./nowishop.component.css']
})
export class NowishopComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    private dataService: HttpService, 
    private nowishopGlobal: NowishopService ) { }

  categoryList: any = [];
  selectedCategory: any = [];

  ngOnInit() {
  	this.getCategoryList();
  }

  getCategoryList(){
    this.http.get(this.dataService.baseUrl + 'Home/HomeCategory').subscribe(
        res => {
          if(res['IsSuccess']){
            this.categoryList = res['Data'];
            this.selectedCategory = this.categoryList[0]['FirstLevelSubCategory'];
          }
        }
      )
  }

}
