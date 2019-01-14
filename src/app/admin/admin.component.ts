import { Component, OnInit } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }
  loading: any = false;

  ngOnInit() {
  }

  setLoading(loading){
    this.loading = loading;
  }

  showHideNav(){  	
  	$('.dash-nav').toggleClass('dash-nav-collapse');
  	$('.dash-container').toggleClass('dash-container-collapse');
  	$('.dash-logo').toggleClass('hide');
  	$('.nav-name').toggleClass('hide');
  }

}
