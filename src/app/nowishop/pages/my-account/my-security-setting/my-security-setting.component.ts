import { Component, OnInit } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-my-security-setting',
  templateUrl: './my-security-setting.component.html',
  styleUrls: ['./my-security-setting.component.css', '../my-account.component.css']
})
export class MySecuritySettingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  changePassword(){
  	$('#changePassword').modal('show');
  }

}
