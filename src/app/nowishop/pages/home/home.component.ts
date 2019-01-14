import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
declare let $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private dataService: HttpService) { }
  productTagList: any = [];
  
  ngOnInit() {
    this.loadJQuery();
  }

  loadJQuery(){
    setTimeout(function(){
      $('[data-toggle="tooltip"]').tooltip();
      $('.carousel').carousel();
    }, 0)
  }

}
