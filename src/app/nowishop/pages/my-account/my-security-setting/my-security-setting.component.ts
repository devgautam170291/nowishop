import { Component, OnInit } from '@angular/core';
import { ResetPasswordModel } from './my-security-setting-model';
import { Router } from '@angular/router';
import { NowishopService } from '../../../../services/nowishop.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../services/http.service';
declare let $: any;

@Component({
  selector: 'app-my-security-setting',
  templateUrl: './my-security-setting.component.html',
  styleUrls: ['./my-security-setting.component.css', '../my-account.component.css']
})
export class MySecuritySettingComponent implements OnInit {

  constructor(
  	private nowishopGlobal: NowishopService,
  	private http: HttpClient, 
  	private dataService: HttpService
  	) { }

  model: any;
  userInfo: any;

  ngOnInit() {
  	this.loadModel();
  	this.getUserInfo();
  }

  getUserInfo(){
  	if(this.nowishopGlobal.isUserInfo()){
  		this.userInfo = this.nowishopGlobal.getUserInfo();
  	}
  }

  loadModel(){
  	this.model = new ResetPasswordModel();
  }

  changePassword(){
  	$('#changePassword').modal('show');
  	var model = {
        "emailID": this.userInfo.emailId
      }
      this.http.post(this.dataService.baseUrl + 'User/ForgotPassword', model).subscribe(
          res => {
            if(res['IsSuccess']){   

            }
          }
        )
  }

  resetPassword(){
  	this.model.UserID = this.userInfo.userId;
      this.http.post(this.dataService.baseUrl + 'User/UpdatePassword', this.model).subscribe(
        res => {
          if(res['IsSuccess']){
          	$('#changePassword').modal('hide');
          	alert('successfully updated');
          }
        }
      )
   }

}
