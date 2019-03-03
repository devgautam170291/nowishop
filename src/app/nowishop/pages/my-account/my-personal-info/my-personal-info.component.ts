import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../services/http.service';
import { NowishopService } from '../../../../services/nowishop.service';
import { Router } from '@angular/router';
import { MyPersonalInfoModel } from  './my-personal-info-model';
declare let $: any;

@Component({
  selector: 'app-my-personal-info',
  templateUrl: './my-personal-info.component.html',
  styleUrls: ['./my-personal-info.component.css', '../my-account.component.css']
})
export class MyPersonalInfoComponent implements OnInit {

  constructor(
  	private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService
  	) { }

  model: any;
  singleHobby: any;
  hobbyArray: any = [];
  userInfo: any;
  countryList: any = [];

  ngOnInit() {
    this.loadModel();
    this.getUserInfo();
    this.getCountryList();
    this.getUserDetails();
  }

  loadModel(){
    this.model = new MyPersonalInfoModel();
  }

  ngAfterViewChecked(){
    $('.datetimepicker').datetimepicker({ 
        allowInputToggle: false,
        inline: false,
        sideBySide: true,
        keepOpen: false,
        debug: false,
        format: 'YYYY-MM-DD',
    });
  }

  addHobby(){
    if(!this.hobbyArray.includes(this.singleHobby)){
      this.hobbyArray.push(this.singleHobby);
      this.singleHobby = "";
    }
  }

  getUserInfo(){
    if(this.nowishopGlobal.isUserInfo()){
      this.userInfo = this.nowishopGlobal.getUserInfo();
    }
  }

  getUserDetails(){
    this.http.get(this.dataService.baseUrl + 'UserAccount/GetUserProfile/'+this.userInfo.userId).subscribe(
      res=>{
        this.model = res['Data'];
        this.hobbyArray = this.model.Hobby.split('|');
      }
    )
  }

  selectGender(val){
    this.model.Gender = val;
  }

  getCountryList(){
    this.http.get(this.dataService.baseUrl + 'UserAccount/GetCountryList').subscribe(
      res=>{
        this.countryList = res['Data'];
      }
    )
  }

  saveUserInfo(){
    this.model.Hobby = this.hobbyArray.join('|');
    this.http.post(this.dataService.baseUrl+'UserAccount/EditUserProfile', this.model).subscribe(
      res => {
        if(res['IsSuccess']){
          alert('saved');
        }        
      }
    )
  }

}
